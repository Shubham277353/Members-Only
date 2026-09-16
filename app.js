const express = require("express");
const path = require("node:path");
const Router = require("./routes/Router");
const authRouter = require("./routes/authRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

app.use("/", Router);
app.use("/users", authRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {

    if(error){
        throw error;
    }
    console.log(`Server listening on port ${PORT}`);
})