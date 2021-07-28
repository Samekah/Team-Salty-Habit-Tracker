const db = require('../dbConfig');

class Frequency {
    constructor(data) {
      this.id = data.id;
      this.frequency = data.frequency_name;
      this.numDays = data.number_of_days;
    }

    static get all() {
        return new Promise(async (res, rej) => {
          try {
            let allFrequencies = await db.query(`SELECT * FROM frequency;`);
            let data = allFrequencies.rows.map((r) => new Frequency(r));
            res(data);
          } catch (err) {
            rej('Could not access available habits');
          }
        });
      }
}

module.exports = Frequency;