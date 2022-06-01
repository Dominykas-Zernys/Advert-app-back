/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
const mysql = require('mysql2/promise');
const { dbConnect } = require('../helpers');

async function getAdsFromDb() {
  try {
    const sql =
      'SELECT id, phone, email, banner_img AS imageSrc, category_id AS categoryId, short_description AS shortDescription, created_at AS createdAt, title, style_id AS styleId FROM adverts ORDER BY created_at DESC LIMIT 200';
    const con = await mysql.createConnection(dbConnect);
    const [adverts] = await con.query(sql);
    await con.close();
    return adverts;
  } catch (error) {
    return false;
  }
}

async function getOneAdFromDb(id) {
  try {
    const sql = 'SELECT id, user_id AS userId, phone, email, image_src AS imageSrc, description, title, style_id AS styleId FROM adverts WHERE id=?';
    const con = await mysql.createConnection(dbConnect);
    const [[advert]] = await con.execute(sql, [id]);
    await con.close();
    return advert;
  } catch (error) {
    return false;
  }
}

async function getOwnerAdsFromDb(userId) {
  try {
    const sql =
      'SELECT id, user_id AS userId, phone, email, banner_img AS imageSrc, category_id AS categoryId, short_description AS shortDescription, created_at AS createdAt, title, style_id AS styleId FROM adverts WHERE user_id=? ORDER BY created_at DESC LIMIT 200';
    const con = await mysql.createConnection(dbConnect);
    const [adverts] = await con.execute(sql, [userId]);
    await con.close();
    return adverts;
  } catch (error) {
    return false;
  }
}

async function addNewAdToDb(userId, adData, img) {
  try {
    const dataToPost = [
      userId,
      adData.category,
      img,
      adData.description,
      adData.email,
      adData.phone,
      adData.shortDescription,
      adData.style,
      adData.title,
      adData.bannerImg,
    ];
    const sql =
      'INSERT INTO adverts (user_id, category_id, image_src, description, email, phone, short_description, style_id, title, banner_img) VALUES(?,?,?,?,?,?,?,?,?,?)';
    const con = await mysql.createConnection(dbConnect);
    const [adverts] = await con.execute(sql, dataToPost);
    await con.close();
    return adverts;
  } catch (error) {
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
