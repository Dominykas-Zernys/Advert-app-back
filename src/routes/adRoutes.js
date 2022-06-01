/* eslint-disable object-curly-newline */
const express = require('express');
const { getAds, getOwnerAds, getAd, postAd, deleteAd } = require('../controllers/adController');
const { verifyJWToken, validateAdvert, checkFileType, checkFileSize, verifyJWTokenOptional } = require('../helpers');

const adRouter = express();

adRouter.get('/', getAds);
adRouter.get('/user-ads', verifyJWToken, getOwnerAds);
adRouter.get('/:id', verifyJWTokenOptional, getAd);
adRouter.post('/', verifyJWToken, checkFileSize, checkFileType, validateAdvert, postAd);
adRouter.delete('/:id', verifyJWToken, deleteAd);

module.exports = adRouter;
