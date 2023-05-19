const {MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
module.exports = {
    name: "ping",
    description: "Ping Pong!",
    options: [],
    perms: {
      user:  []
  },
    run: async (client, interaction) => {

     await interaction.reply({content: ':ping_pong: Pong...', ephemeral: true})
     await interaction.editReply({content: `:ping_pong: Pong...\n> ${client.ws.ping}ms`, ephemeral: true})
    }
}