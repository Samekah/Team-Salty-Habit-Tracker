const { Pool } = require("pg");

const env = process.env.NODE_ENV || 'development';

let connectionString = {
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST
};

if (env !== 'development') {
    connectionString = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    };
};

const pool = new Pool(connectionString);

module.exports = pool;