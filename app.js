const express = require("express");
const path = require("node:path");
const Router = require("./routes/Router");
const authRouter = require("./routes/authRouter");
const session = require("express-session");
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);
const passport = require("./passport-config");
const messageRouter = require("./routes/messages");


const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

app.use("/messages", messageRouter);
app.use("/auth", authRouter);
app.use("/", Router);


const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {

    if(error){
        throw error;
    }
    console.log(`Server listening on port ${PORT}`);
})