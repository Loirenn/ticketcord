const mongoose = require("mongoose");
module.exports = mongoose.model("users", new mongoose.Schema({ 
    userID: { type: String, required: true },
    blackList: { type: Boolean, required: true, default: false },
    token: { type: String, required: true },
    profile: { type: Object, required: true },
}));