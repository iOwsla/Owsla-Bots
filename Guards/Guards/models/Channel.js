const { Schema, model } = require("mongoose");

const ChannelSchema = new Schema({
    guildID: String,
    channels: Array
});

const ChannelModel = model("channelbackup", ChannelSchema);
module.exports = ChannelModel;