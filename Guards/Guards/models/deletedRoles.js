const mongoose = require("mongoose");

const data = mongoose.Schema({
    oldRoleID: String,
    newRoleID: String,
    Date: Number
});

module.exports = mongoose.model("deletedRole", data);