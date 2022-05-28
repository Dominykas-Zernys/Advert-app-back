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
  res.send({ success: true, msg });
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
      image: Joi.any(),
      shortDescription: Joi.string().min(10).max(100).required(),
      description: Joi.string().min(10).max(400).required(),
      email: Joi.string().email().max(40).required(),
      phone: Joi.string()
        .min(8)
        .max(15)
        .pattern(/^[0-9]+$/)
        .required(),
      style: Joi.number().required(),
      title: Joi.string().max(25).required(),
      bannerImg: Joi.string().required(),
    });
    await schema.validateAsync(req.body);
    console.log(req.body);
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

// Multer for image upload

const multer = require('multer');
const path = require('path');
const _ = require('lodash');

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // supported image file mimetypes
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

  if (_.includes(allowedMimes, file.mimetype)) {
    // allow supported image files
    cb(null, true);
  } else {
    req.error = 'Invalid file type';
    // throw error for invalid files
    cb(null, true);
  }
};

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 }, fileFilter });

const uploadSingleImage = upload.single('image');

function checkFileSize(req, res, next) {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      return failResponse(res, 'File is too large');
    }
    next();
  });
}

function checkFileType(req, res, next) {
  req.error ? failResponse(res, req.error) : next();
}

// Function to convert image buffer to base64 string

function bufferToBase64(buffer, fileType) {
  const imgInBase64 = Buffer.from(buffer).toString('base64');
  return `data:${fileType};base64, ${imgInBase64}`;
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
  upload,
  checkFileSize,
  checkFileType,
  bufferToBase64,
};
