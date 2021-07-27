const db = require('../dbConfig');

// Habit name
// habit category
//The frequency the user has listed the category for
// start date of habit
// the number of days the habit has been done

class Habit {
  constructor(data) {
    (this.id = data.habit_id), (this.habit_name = data.habit_name), (this.category_id = data.category_id);
  }

  static getAllHabits() {
    return new Promise(async (res, rej) => {
      try {
        let allHabits = db.query(`SELECT * FROM habits;`);
        let entireHabitsList = allHabits.rows[0].map((row) => new Habit(row));
        res(entireHabitsList);
      } catch (err) {
        rej('Could not access available habits');
      }
    });
  }

  static getAllHabitsForCategoryId(category_id) {
    return new Promise(async (res, rej) => {
      try {
        let result = db.query(`SELECT * FROM habits where category_id=$1;`, [category_id]);
        let habitsList = result.rows[0].map((row) => new Habit(row));
        res(habitsList);
      } catch (err) {
        rej('Could not access habits for category');
      }
    });
  }
}

module.exports = User;
