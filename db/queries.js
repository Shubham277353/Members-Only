const pool = require("./pool");

async function postSignUpForm(data, hashedPassword){
    await pool.query(`
        INSERT INTO users(first_Name, last_Name, email, password) 
        VALUES ($1, $2, $3, $4)
        `, [data.firstName, data.lastName, data.email, hashedPassword]);
}

async function  getUsersByEmail(email) {
    const res = await pool.query(
        `
        SELECT * FROM users WHERE email = $1
        `
    , [email]);
    return res.rows[0];
}

async function getAllMessages(){
    const result = await pool.query(
        `
        SELECT * FROM messages
        `
    );

    return result.rows;
}

module.exports = {
    postSignUpForm,
    getUsersByEmail,
    getAllMessages,
}