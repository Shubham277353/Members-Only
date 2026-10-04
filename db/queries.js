const pool = require("./pool");

async function postSignUpForm(data, hashedPassword) {
  await pool.query(
    `
        INSERT INTO users(first_Name, last_Name, email, password) 
        VALUES ($1, $2, $3, $4)
        `,
    [data.firstName, data.lastName, data.email, hashedPassword],
  );
}

async function getUsersByEmail(email) {
  const res = await pool.query(
    `
        SELECT * FROM users WHERE email = $1
        `,
    [email],
  );
  return res.rows[0];
}

async function getAllMessages() {
  const result = await pool.query(
    `
    SELECT
    messages.id AS message_id,
    messages.user_id as user_id,
    messages.title,
    messages.message,
    messages.created_at,
    users.first_name,
    users.last_name,
    users.membership_status,
    users.isadmin
    FROM messages
    JOIN users
    ON messages.user_id = users.id
        `,
  );

  return result.rows;
}

async function setMembershipStatus(id) {
  await pool.query(
    `
        UPDATE users
        SET membership_status = TRUE
        WHERE id = $1
        `,
    [id],
  );
}

async function postMessageForm(id, title, message) {
  await pool.query(
    `
        INSERT INTO messages(user_id, title, message)
        VALUES ($1, $2, $3)           
        `,
    [id, title, message],
  );
}

async function setAdminStatus(id) {
  await pool.query(
    `
        UPDATE users
        SET isAdmin = TRUE
        WHERE id = $1
        `,
    [id],
  );
}

async function deleteMessage(id) {
  await pool.query(
    `
        Delete FROM messages
        WHERE id = $1
        `,
    [id],
  );
}

module.exports = {
  postSignUpForm,
  getUsersByEmail,
  getAllMessages,
  setMembershipStatus,
  postMessageForm,
  setAdminStatus,
  deleteMessage,
};
