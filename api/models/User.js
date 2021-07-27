const db = require('../dbConfig');
const UserHabit = require('./UserHabit');

class User {
  constructor(data) {
    this.id = data.id; //may be problematic
    this.username = data.username;
    this.password = data.password;
    this.firstname = data.first_name;
    this.lastname = data.last_name;
    this.email = data.email_address;
  }

  static getAllUserData() {
    return new Promise(async (res, rej) => {
      try {
        let allData = await db.query(
          'SELECT id, username, first_name, last_name, email_address FROM users;'
        );
        let allUsers = allData.rows.map((r) => new User(r));
        res(allUsers);
      } catch (err) {
        rej('Could not access all users');
      }
    });
  }

  static findUserByUsername(username) {
    return new Promise(async (res, rej) => {
      try {
        let allUserData = await db.query(`SELECT id, username, password FROM users WHERE username = $1;`, [username]);
        let user = new User(allUserData.rows[0]);
        res(user);
      } catch (err) {
        rej(`Could not access this username`);
      }
    });
  }

  static create(username, password, firstname, lastname, email) {
    return new Promise(async (res, rej) => {
      try {
        let newUserIntoDb = await db.query(
          `INSERT INTO users (username, password, first_name, last_name, email_address) VALUES ($1,$2, $3, $4, $5) RETURNING *;`,
          [username, password, firstname, lastname, email]
        );
        let newUser = new User(newUserIntoDb.rows[0]);
        res(newUser);
      } catch (err) {
        rej('Could not create user' + err);
      }
    });
  }

  static async findAUsersHabitsById(id) {
    return new Promise(async (res, rej) => {
      try {

        let userHabitsInfo = await db.query(
          `SELECT user_habits.id, habits.habit, frequency.frequency_name, user_habits.starting_date FROM user_habits JOIN habits ON user_habits.habit_id = habits.id JOIN frequency ON user_habits.frequency_id = frequency.id WHERE user_habits.user_id = $1 ORDER BY user_habits.id;`,
          [id]
        );

        const resultsArray = [];

        let usersHabitsList = userHabitsInfo.rows.map((r) => new UserHabit(r));

        for(let userHabit of usersHabitsList) {
          const history = await UserHabit.history(userHabit.id);
          userHabit.history = history
          resultsArray.push(userHabit)
        }
        
        res(resultsArray);
      } catch (err) {
        rej('Could not access user habits');
      }
    });
  }

}

module.exports = User;
