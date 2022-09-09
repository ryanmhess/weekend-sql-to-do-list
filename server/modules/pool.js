const pg = require('pg');
const Pool = pg.Pool;
const database = "weekend-to-do-app";
const host = "localhost";
const pool = new Pool ({
    database: database,
    host: host
})

pool.on('connect', () => {
    console.log(`Successfully connected to ${host} ${database}`);
})
pool.on('error', () => {
    console.log(`Failed to connect to ${host} ${database}`, error);
})

module.exports = pool;