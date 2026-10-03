const db = require("../db/queries");

async function getHomePage(req, res) {
  const messages = req.session.messages;
  const latestMessage = messages ? messages[messages.length - 1] : null;
  if (req.session.messages) {
    req.session.messages = [];
  }
  console.log("Error Message: ", messages);
  const result = await db.getAllMessages();
  res.render("home", { messages: result, isAuthenticated: req.isAuthenticated()});
}

module.exports = {
  getHomePage,
};
