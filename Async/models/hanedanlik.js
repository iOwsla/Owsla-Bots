const mongoose = require("mongoose");

const data = mongoose.Schema({
    userID: String,
    Lider: String,
    guildID: String,
    channel: Number,
    points: Number,
    Taglı: Number,
    Yetkili: Number,
    Davet: Number,
    Yönetici: Boolean
});


module.exports = mongoose.model("hanedanlik", data);