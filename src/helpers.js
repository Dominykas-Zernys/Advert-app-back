/* eslint-disable comma-dangle */
/* eslint-disable newline-per-chained-call */
/* eslint-disable consistent-return */
require('dotenv').config();

// Database connection object

const dbConnect = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

// Response functions

function successResponse(res, msg) {
  res.json({ success: true, msg });
}

function failResponse(res, err = 'something went wrong') {
  res.status(400).json({ success: false, err });
}

// Password encryption and verification

const bcrypt = require('bcryptjs');

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function verifyPassword(enteredPass, passFromDb) {
  return bcrypt.compareSync(enteredPass, passFromDb);
}

// Jsonwebtoken functions

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

function createJWToken(userId) {
  return jwt.sign({ id: userId }, jwtSecret);
}

function verifyJWToken(req, res, next) {
  if (!req.headers.authorization) {
    return failResponse(res, 'no token');
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return failResponse(res, 'token not valid');
    }
    req.userId = user.id;
    next();
  });
}

// Joi validation

const Joi = require('joi');

async function validateRegister(req, res, next) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().max(40).required(),
      username: Joi.string().alphanum().min(4).max(40).required(),
      password: Joi.string().min(5).max(40).required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    failResponse(res, error.details[0].message);
  }
}

async function validateLogin(req, res, next) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().max(40).required(),
      password: Joi.string().min(5).max(40).required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    failResponse(res, error.details[0].message);
  }
}

async function validateAdvert(req, res, next) {
  try {
    const schema = Joi.object({
      category: Joi.number().required(),
      image: Joi.string().required(),
      shortDescription: Joi.string().min(10).required(),
      description: Joi.string().min(10).max(400).required(),
      email: Joi.string().email().max(40).required(),
      phone: Joi.string().required(),
      style: Joi.number().required(),
      title: Joi.string().required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    failResponse(res, error.details[0].message);
  }
}

async function validateCategory(req, res, next) {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    failResponse(res, error.details[0].message);
  }
}

module.exports = {
  dbConnect,
  successResponse,
  failResponse,
  hashPassword,
  verifyPassword,
  createJWToken,
  verifyJWToken,
  validateLogin,
  validateRegister,
  validateAdvert,
  validateCategory,
};