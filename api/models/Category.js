const db = require('../dbConfig');

class Category {
  constructor(data) {
    this.id = data.id;
    this.category = data.category;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(`SELECT * FROM categories;`);
        let allCategories = result.rows.map((r) => new Category(r));
        res(allCategories);
      } catch (err) {
        rej('Could not retrieve all categories:' + err);
      }
    });
  }

  static getCategoryById(category_id) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(`SELECT * FROM categories WHERE id = $1;`, [category_id]);
        let chosenCategory = new Category(result.rows[0]);
        res(chosenCategory);
      } catch (err) {
        rej('Could not access category' + err);
      }
    });
  }
}

module.exports = Category;