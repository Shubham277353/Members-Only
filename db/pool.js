const {Pool} = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "goluboi",
    database: "members_only",
    post: 5432,
    password: process.env.DB_PASSWORD,
})

module.exports = pool;