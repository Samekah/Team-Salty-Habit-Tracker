const db = require('../dbConfig');

class UserHabit {
    constructor(data) {
        this.id = data.id;
        this.habit = data.habit;
        this.frequency = data.frequency_name;
        this.start = data.starting_date;
        this.history = data.history
    }

    static create(userId,habitId,frequencyId,startDate) {
        return new Promise(async (res, rej) => {
            try {
                let data = await db.query(`INSERT INTO user_habits (user_id,habit_id,frequency_id,starting_date) VALUES ($1,$2, $3, $4) RETURNING *;`, [userId,habitId,frequencyId,startDate]);
                let newUserHabit = new UserHabit(data.rows[0]);
                res(newUserHabit);
            } catch (err) {
                rej(`Could not create this user habit`);
            }
        });
    }

    static history(id) {
        return new Promise(async (res, rej) => {
        try {
            let data = await db.query(`SELECT the_date FROM user_habits_history WHERE user_habit_id = $1;`, [id]);
            let historyList = data.rows.map((r) => r.the_date);
            res(historyList);
        } catch (err) {
            rej(`Could not retrieve history for this user habit record`);
        }
        });
    }

    static addHistory(id,date) {
        return new Promise(async (res, rej) => {
        try {
            let data = await db.query(`INSERT INTO user_habits_history (user_habit_id, the_date) VALUES ($1, $2)`, [id, date]);
            res('Success');
        } catch (err) {
            rej(`Could not create a history record`);
        }
        });
    }

}

module.exports = UserHabit;