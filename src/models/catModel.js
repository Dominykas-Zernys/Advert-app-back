const mysql = require('mysql2/promise');
const { dbConnect } = require('../helpers');

async function getCategoriesFromDb() {
  try {
    const sql = 'SELECT * FROM categories';
    const con = await mysql.createConnection(dbConnect);
    const [categories] = await con.query(sql);
    await con.close();
    return categories;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function postNewCatToDb(categoryData) {
  try {
    const { name, description } = categoryData;
    const sql = 'INSERT INTO categories (name, description) VALUES (?,?)';
    const con = await mysql.createConnection(dbConnect);
    const [postResult] = await con.execute(sql, [name, description]);
    await con.close();
    return postResult;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { getCategoriesFromDb, postNewCatToDb };
