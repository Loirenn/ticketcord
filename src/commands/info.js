const {MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const Discord = require('discord.js');
const Mongoose = require('mongoose');
const moment = require('moment');
require('moment-duration-format');
const config = require('../config.js');
module.exports = {
    name: "info",
    description: "View stats for Ticketcord!",
    options: [],
    perms: {
      user:  []
  },
    run: async (client, interaction) => {
          let $now = Date.now();
          const _guild = require('../models/guild.js');
          const _lang_data = await _guild.findOne({ guildID: interaction.guild.id })
          const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)

        
        const embed = new MessageEmbed()
        .setColor(config.bot.embeds.colors.violet)
        .setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
        .addField(_lang.bot.info.stats.name, `
\`${client.guilds.cache.size.toLocaleString()}\` | ${_lang.bot.info.stats.guilds}
\`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\` | ${_lang.bot.info.stats.users}
\`${client.channels.cache.size.toLocaleString()}\` | ${_lang.bot.info.stats.channels}
`, true)
        .addField(_lang.bot.info.versions.name, `
\`${Discord.version}\` | Discord.js
\`${Mongoose.version}\` | Mongoose
`, true)
        .addField(_lang.bot.info.pings.name, `
\`${client.ws.ping}ms\` | Ticketcord
\`${Date.now() - $now}ms\` | Mongoose 
`, true)
    await interaction.reply({
        embeds: [
            embed
        ]
    })
        
    }
}