/* eslint-disable no-unused-expressions */
const { successResponse, failResponse } = require('../helpers');
const { registerUserToDb, loginUserToDb } = require('../models/authModel');

async function registerUser(req, res) {
  const regRes = await registerUserToDb(req.body);
  regRes
    ? successResponse(res, 'user registered successful')
    : failResponse(res);
}

async function loginUser(req, res) {
  const user = await loginUserToDb(req.body);
  if (!user) {
    failResponse(res);
    return;
  }
  user.password === req.body.password
    ? successResponse(res, 'login successful')
    : failResponse(res);
}

module.exports = { registerUser, loginUser };
