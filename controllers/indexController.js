const db = require("../db/queries");

async function getHomePage(req, res){
  const result = await db.getAllMessages();
  res.render("home", {messages: result});
}

module.exports = {
  getHomePage,
};
