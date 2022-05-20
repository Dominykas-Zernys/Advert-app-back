const { successResponse, failResponse } = require('../helpers');
const { getCategoriesFromDb, postNewCatToDb } = require('../models/catModel');

async function getCategories(req, res) {
  const categories = await getCategoriesFromDb();
  categories ? successResponse(res, categories) : failResponse(res);
}

async function postCategory(req, res) {
  const postResult = await postNewCatToDb(req.body);
  postResult
    ? successResponse(res, 'new category added successfully')
    : failResponse(res);
}

module.exports = { getCategories, postCategory };
