const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotEnv = require("dotenv");
dotEnv.config();
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access")
const Handlebars = require("handlebars")
const URL = process.env.URL
const app = express();
const flash = require("connect-flash")
const path = require("path")
const session = require("express-session");
const mbSession = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const exphbs = require("express-handlebars");

async function start() {
    try {
        await mongoose.connect(URL);
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portda ishladi`);
        });
    } catch (error) {
        console.log(error)
    }
}
start();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),})
const store = new mbSession({
    collection: 'sessions',
    uri: URL
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "page");
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(flash())



app.use("/", require("./routes/home"));
 