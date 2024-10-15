const { Schema, model } = require("mongoose");
const user = new Schema({
    username: {
        type: String,
        require: true
    },
    parol: {
        type: String,
        require: true
    },
})
module.exports = model("User", user);
