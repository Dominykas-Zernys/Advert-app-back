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

module.exports = { dbConnect, successResponse, failResponse };
