const { authenticate } = require("passport");
const db = require("../db/queries");

async function getHomePage(req, res) {
  const messages = req.session.messages;
  const latestMessage = messages ? messages[messages.length - 1] : null;
  if (req.session.messages) {
    req.session.messages = [];
  }
  console.log("Error Message: ", latestMessage);
  const result = await db.getAllMessages();
  console.log(result);
  res.render("home", { users: result, authenticatedUser: req.user});
}

module.exports = {
  getHomePage,
};
