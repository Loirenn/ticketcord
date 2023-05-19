const {MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const blacklistData = require('../models/blacklist.js');
module.exports = {
    name: "whitelist",
    description: "Add whitelist user!",
    options: [
      {
        type: 6,
        name: "user",
        description: "Tag the user.",
        required: true
      }
    ],
    perms: {
      user:  []
  },
    run: async (client, interaction) => {

      const _guild = require('../models/guild.js');
      const _lang_data = await _guild.findOne({ guildID: interaction.guild.id })
      const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)

      if (!interaction.member.roles.cache.get(_lang_data.ticket_role)) return;
      
      const _hoistedOptions = interaction.options._hoistedOptions[0]

      let _data = await blacklistData.findOne({
        user: _hoistedOptions.user.id
      });
      
      if(!_data) return interaction.error(_lang.bot.ticket.whitelist.auErr);

        await blacklistData.deleteOne({
          user: _hoistedOptions.user.id,
        });
      
      interaction.success(_lang.bot.ticket.whitelist.success.replace("{user}", _hoistedOptions.user.id));

      
    }
}