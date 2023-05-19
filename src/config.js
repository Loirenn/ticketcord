const { Intents } = require('discord.js');

module.exports = {
    bot: {
        token: '',
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES
        ],
      embeds: {
        colors: {
          violet: "#9146FF",
          rose: "#E03434",
          grass: "",
          sky: "",
          honey: ""
        }
      },
      presence: {
        status: "online",
        activity: "Developed by Loiren",
        type: "WATCHING",
      }
    },
    database: {
      mongoURL: "",
    },
  ticket: {
    limit: 10
  },
  
  cmdDir: "./src/commands"
};