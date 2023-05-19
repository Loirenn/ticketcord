const {MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const channelData = require('../models/channel.js');
module.exports = {
    name: "close",
    description: "Close the ticket.",
    options: [],
    perms: {
      user:  []
  },
    run: async (client, interaction) => {

      const _guild = require('../models/guild.js');
      const _lang_data = await _guild.findOne({ guildID: interaction.guild.id })
      const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)

      let _channel = await channelData.findOne({
        channelID: interaction.channel.id
      });
      
      if(!_channel) return;
      
      await interaction.reply({
                    components: [
                    new MessageActionRow().addComponents(
                        new MessageButton()
                            .setLabel(_lang.bot.ticket.button.close)
                            .setCustomId("CLOSE_TICKET")
                            .setStyle("DANGER")
                    ),
                ],
          })
      
    }
}