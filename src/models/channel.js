const mongoose = require("mongoose");
module.exports = mongoose.model(
  "channel",
  new mongoose.Schema({
    guildID: String,
    creatorID: String,
    channelID: String
  })
);
