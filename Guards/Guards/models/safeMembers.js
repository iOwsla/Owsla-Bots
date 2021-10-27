const mongoose = require("mongoose");

const data = mongoose.Schema({
    guildID: String,
    Full: {type: Array, default: []},
    RoleAndChannel: {type: Array, default: []},
    Role: {type: Array, default: []},
    Channel: {type: Array, default: []},
    Bot: {type: Array, default: []},
    BanAndKick: {type: Array, default: []},
    ChatG: {type: Array, default: []},
    SafeRole: {type: Array, default: []},
    Permissions: {type: Array, default: []}
});

module.exports = mongoose.model("safeMembers", data);