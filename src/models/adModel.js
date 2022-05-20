/* eslint-disable operator-linebreak */
const mysql = require('mysql2/promise');
const { dbConnect } = require('../helpers');

async function getAdsFromDb() {
  try {
    const sql = 'SELECT * FROM adverts';
    const con = await mysql.createConnection(dbConnect);
    const [adverts] = await con.query(sql);
    await con.close();
    return adverts;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getOneAdFromDb(id) {
  try {
    const sql = 'SELECT * FROM adverts WHERE id=?';
    const con = await mysql.createConnection(dbConnect);
    const [[advert]] = await con.execute(sql, [id]);
    await con.close();
    return advert;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getOwnerAdsFromDb(userId) {
  try {
    const sql = 'SELECT * FROM adverts WHERE user_id=?';
    const con = await mysql.createConnection(dbConnect);
    const [adverts] = await con.execute(sql, [userId]);
    await con.close();
    return adverts;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addNewAdToDb(userId, adData) {
  try {
    const dataToPost = [
      userId,
      adData.categoryId,
      adData.imageSrc,
      adData.description,
      adData.email,
      adData.phone,
    ];
    const sql =
      'INSERT INTO adverts (user_id, category_id, image_src, description, email, phone) VALUES(?,?,?,?,?,?)';
    const con = await mysql.createConnection(dbConnect);
    const [adverts] = await con.execute(sql, dataToPost);
    await con.close();
    return adverts;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function removeAddFromDb(userId, adId) {
  try {
    const sql = 'DELETE FROM adverts WHERE user_id=? AND id=? LIMIT 1';
    const con = await mysql.createConnection(dbConnect);
    const [deleteResult] = await con.execute(sql, [userId, adId]);
    await con.close();
    return deleteResult;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  getAdsFromDb,
  getOneAdFromDb,
  getOwnerAdsFromDb,
  addNewAdToDb,
  removeAddFromDb,
};
