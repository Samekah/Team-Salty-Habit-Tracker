const db = require('../dbConfig');

// Habit name
// habit category
//The frequency the user has listed the category for
// start date of habit
// the number of days the habit has been done

class Habit {
  constructor(data) {
    this.id = data.id;
    this.habit_name = data.habit;
    this.category_id = data.category_id;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        let allHabits = await db.query(`SELECT * FROM habits;`);
        let entireHabitsList = allHabits.rows.map((r) => new Habit(r));
        res(entireHabitsList);
      } catch (err) {
        rej('Could not access available habits');
      }
    });
  }

  static findById(id) {
    return new Promise(async (res, rej) => {
      try {
        let data = await db.query(`SELECT * FROM habits WHERE id = $1;`, [id]);
        let habit = new Habit(data.rows[0]);
        res(habit);
      } catch (err) {
        rej(`Could not find this habit`);
      }
    });
  }

  static findByCategory(category_id) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(`SELECT * FROM habits WHERE category_id = $1;`, [category_id]);
        let habitsList = result.rows.map((r) => new Habit(r));
        res(habitsList);
      } catch (err) {
        rej('Could not access habits for category');
      }
    });
  }
}

module.exports = Habit;
