const db = require("../db/queries");

async function getNewMessageForm(req, res){
    console.log("hii from message form");
    const result = await db.getAllMessages();
    res.render("createNewForm", { users: result, authenticatedUser: req.user});
}

async function postNewMessageForm(req, res) {
    const userId = req.user.id;
    const messageTitle = req.body.title;
    const message = req.body.message;
    await db.postMessageForm(userId, messageTitle, message);
    res.redirect("/");
}

module.exports = {
    getNewMessageForm,
    postNewMessageForm,
}