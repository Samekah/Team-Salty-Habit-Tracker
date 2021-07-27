const db = require('../dbConfig');

class Category {
  constructor(data) {
    this.id = data.id;
    this.category = data.category;
  }

  static getAllCategories() {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(`SELECT * FROM categories;`);
        let allCategories = result.rows.map((r) => new User(r));
        res(allCategories);
      } catch (err) {
        rej('Could not retrieve all categories:' + err);
      }
    });
  }

  static getCategoryById(id) {
    return new Promise(async (res, rej) => {
      try {
        let result = db.query(`SELECT * FROM categories where category_id=$1;`, [category_id]);
        let chosenCategory = new Category(result.rows[0]);
        res(chosenCategory);
      } catch (err) {
        rej('Could not access category' + err);
      }
    });
  }
}
