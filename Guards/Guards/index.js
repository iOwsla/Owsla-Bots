const mongoose = require("mongoose");
const Config = require("./Config.json");

mongoose.connect(Config.Database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Mongoose connected.")
    require("./bot.js");
});