/* eslint-disable object-curly-newline */
const { successResponse, failResponse, bufferToBase64 } = require('../helpers');
const { getAdsFromDb, getOwnerAdsFromDb, getOneAdFromDb, addNewAdToDb, removeAddFromDb } = require('../models/adModel');

async function getAds(req, res) {
  const ads = await getAdsFromDb();
  ads ? successResponse(res, ads) : failResponse(res);
}

async function getAd(req, res) {
  const ad = await getOneAdFromDb(req.params.id);
  if (req.userId && req.userId === ad.userId) {
    ad.belongsToUser = true;
  } else {
    ad.belongsToUser = false;
  }
  ad ? successResponse(res, ad) : failResponse(res);
}

async function getOwnerAds(req, res) {
  const ownerAds = await getOwnerAdsFromDb(req.userId);
  ownerAds ? successResponse(res, ownerAds) : failResponse(res);
}

async function postAd(req, res) {
  const imgFullString = bufferToBase64(req.file.buffer, req.file.mimetype);
  const newAddPosted = await addNewAdToDb(req.userId, req.body, imgFullString);
  newAddPosted ? successResponse(res, 'new advert added successfully') : failResponse(res, "couldn't add new advert");
}

async function deleteAd(req, res) {
  const deleteResult = await removeAddFromDb(req.userId, req.params.id);
  deleteResult.affectedRows ? successResponse(res, 'advert deleted successfully') : failResponse(res, "couldn't delete advert");
}

module.exports = {
  getAds,
  getAd,
  getOwnerAds,
  postAd,
  deleteAd,
};
