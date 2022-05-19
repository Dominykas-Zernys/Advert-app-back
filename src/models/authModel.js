/* eslint-disable operator-linebreak */
const mysql = require('mysql2/promise');
const { dbConnect } = require('../helpers');

async function registerUserToDb({ email, username, password }) {
  try {
    const sql =
      'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const con = await mysql.createConnection(dbConnect);
    const [regUser] = await con.execute(sql, [email, username, password]);
    await con.close();
    return regUser;
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return false;
  }
}

module.exports = { registerUserToDb, loginUserToDb };
