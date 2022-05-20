const { successResponse, failResponse } = require('../helpers');
const {
  getAdsFromDb,
  getOwnerAdsFromDb,
  getOneAdFromDb,
  addNewAdToDb,
  removeAddFromDb,
} = require('../models/adModel');

async function getAds(req, res) {
  const ads = await getAdsFromDb();
  ads ? successResponse(res, ads) : failResponse(res);
}

async function getAd(req, res) {
  const ad = await getOneAdFromDb(req.params.id);
  ad ? successResponse(res, ad) : failResponse(res);
}

async function getOwnerAds(req, res) {
  const ownerAds = await getOwnerAdsFromDb(req.userId);
  ownerAds ? successResponse(res, ownerAds) : failResponse(res);
}

async function postAd(req, res) {
  const newAddPosted = await addNewAdToDb(req.userId, req.body);
  newAddPosted
    ? successResponse(res, 'new advert added')
    : failResponse(res, "couldn't add new advert");
}

async function deleteAd(req, res) {
  const deleteResult = await removeAddFromDb(req.userId, req.params.id);
  deleteResult.affectedRows
    ? successResponse(res, 'advert deleted successfully')
    : failResponse(res, "couldn't delete advert");
}

module.exports = {
  getAds,
  getAd,
  getOwnerAds,
  postAd,
  deleteAd,
};
