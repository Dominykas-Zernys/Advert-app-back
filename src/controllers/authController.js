/* eslint-disable no-unused-expressions */
const {
  successResponse,
  failResponse,
  hashPassword,
  verifyPassword,
  createJWToken,
} = require('../helpers');
const {
  registerUserToDb,
  loginUserToDb,
  checkForUser,
} = require('../models/authModel');

async function registerUser(req, res) {
  const hashedPassword = hashPassword(req.body.password);
  const { email, username } = req.body;
  const userExists = await checkForUser(email, username);
  if (userExists) {
    failResponse(res, userExists);
    return;
  }
  const regRes = await registerUserToDb(email, username, hashedPassword);
  regRes
    ? successResponse(res, 'user registered successfuly')
    : failResponse(res);
}

async function loginUser(req, res) {
  const user = await loginUserToDb(req.body);
  if (!user) {
    failResponse(res, "user doesn't exist");
    return;
  }
  if (verifyPassword(req.body.password, user.password)) {
    const token = createJWToken(user.id);
    successResponse(res, token);
    return;
  }
  failResponse(res, 'email or password is not correct');
}

module.exports = { registerUser, loginUser };
