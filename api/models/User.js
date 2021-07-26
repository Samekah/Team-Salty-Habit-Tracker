const db = require('../dbConfig');

class User {
  constructor(data) {
    this.id = data.id; //may be problematic
    this.username = data.username;
    this.password = data.password_digest;
    this.firstname = data.first_name;
    this.lastname = data.last_name;
    this.email = data.email_address;
  }

  static getAllUserData() {
    return new Promise(async (res, rej) => {
      try {
        let allData = await db.query(
          'SELECT users.id, users.username, user_details.first_name, user_details.last_name, user_details.email_address FROM users JOIN user_details ON users.id = user_details.user_id;'
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
        let allUserData = await db.query(`SELECT users.id, users.username FROM users WHERE users.username = $1`, [username]);
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

  static findAUsersHabitsById(id) {}
}

module.exports = User;
