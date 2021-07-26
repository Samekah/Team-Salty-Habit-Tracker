const db = require('../dbConfig');

class User {
  constructor(data) {
    this.id = data.id; //may be problematic
    this.username = data.username;
    this.email = data.email_address;
    this.firstname = data.first_name;
    this.lastname = data.last_name;
    this.password = data.password_digest;
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

  static create(username, email, firstname, lastname, password) {
    return new Promise(async (res, rej) => {
      try {
        let idOfNewUserIntoDb = await db.query(`INSERT INTO users (username, password) VALUES ($1, $5) RETURNING id;`, [username, password]);
        // Commented out is a different attempt
        // let newUserId = await db.query(`SELECT id FROM users ORDER BY id DESC LIMIT 1`)
        // let userId = newUserId.rows[0].id;
        let newUserDetailsIntoDb = await db.query(
          `INSERT INTO user_details (user_id, email_address, first_name, last_name) VALUES (${idOfNewUserIntoDb}, $2, $3, $4) RETURNING *`,
          [email, firstname, lastname]
        );
      } catch (err) {
        ('Could not create user');
      }
    });
  }

  static findUserById;
}

module.exports = User;
