const pool = require("./pool");

async function postSignUpForm(data, hashedPassword){
    await pool.query(`
        INSERT INTO users(first_Name, last_Name, email, password) 
        VALUES ($1, $2, $3, $4)
        `, [data.firstName, data.lastName, data.email, hashedPassword]);
}

module.exports = {
    postSignUpForm,
}