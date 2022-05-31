/* eslint-disable operator-linebreak */
const mysql = require('mysql2/promise');
const { dbConnect } = require('../helpers');

// check if user with given email or username already exists

async function checkForUser(email, username) {
  try {
    const sqlEmail = 'SELECT * FROM users WHERE email=?';
    const sqlUsername = 'SELECT * FROM users WHERE username=?';
    const con = await mysql.createConnection(dbConnect);
    const [emailFound] = await con.execute(sqlEmail, [email]);
    if (emailFound.length) {
      await con.close();
      return 'user with this email already exists';
    }
    const [usernameFound] = await con.execute(sqlUsername, [username]);
    if (usernameFound.length) {
      await con.close();
      return 'user with this username already exists';
    }
    return false;
  } catch (error) {
    return 'something went wrong';
  }
}

// functions to register, delete and login users

async function registerUserToDb(email, username, password) {
  try {
    const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const con = await mysql.createConnection(dbConnect);
    const [regUser] = await con.execute(sql, [email, username, password]);
    await con.close();
    return regUser;
  } catch (error) {
    return false;
  }
}

async function loginUserToDb({ email }) {
  try {
    const sql = 'SELECT * FROM users WHERE email=?';
    const con = await mysql.createConnection(dbConnect);
    const [[user]] = await con.execute(sql, [email]);
    await con.close();
    return user;
  } catch (error) {
    return false;
  }
}

module.exports = { checkForUser, registerUserToDb, loginUserToDb };
