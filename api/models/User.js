const db = require ('../dbConfig')

class User {
    constructor(data){
        this.username = data.username
        this.password = data.password
    }

}

module.exports = User;