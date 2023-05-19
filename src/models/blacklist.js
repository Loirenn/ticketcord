const mongoose = require("mongoose");
module.exports = mongoose.model(
  "blacklist",
  new mongoose.Schema({
    guildID: String,
    staff: String,
    user: String,
    date: Date
  })
);
