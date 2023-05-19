const mongoose = require("mongoose");
module.exports = mongoose.model(
  "guilds",
  new mongoose.Schema({
    guildID: String,
    language: { type: String, default: "en" },
    
    ticket_channel: { type: String, default: null},
    ticket_log: { type: String, default: null },
    ticket_role: { type: String, default: null },
    ticket_messageID: { type: String, default: null },
    ticket_limits: { type: Number, default: 0 },
    total_tickets: { type: Number, default: 0 },
    response_time: { type: Number, default: 0 },
  })
);
