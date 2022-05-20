const express = require('express');
const { getCategories, postCategory } = require('../controllers/catController');
const { validateCategory } = require('../helpers');

const catRouter = express.Router();

catRouter.get('/', getCategories);
catRouter.post('/', validateCategory, postCategory);

module.exports = catRouter;
