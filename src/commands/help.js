const {MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
module.exports = {
    name: "help",
    description: "Learn about commands!",
    options: [],
    perms: {
      user:  []
  },
    run: async (client, interaction) => {

      const _guild = require('../models/guild.js');
      const _lang_data = await _guild.findOne({ guildID: interaction.guild.id })
      const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)
      
    const helpEmbed = new MessageEmbed()
      .setColor(client.config.bot.embeds.colors.violet)
      .setAuthor({name: client.user.username, iconURL: client.user.avatarURL({dynamic:true})})
      .addField(_lang.bot.help.author, _lang.bot.help.description.replace("{client_username}", client.user.username))
      .addField(_lang.bot.help.author2, _lang.bot.help.description2)
      await interaction.reply({
        embeds: [ helpEmbed ],
        ephemeral: true
    });
    }
}