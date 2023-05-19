const {MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const channelData = require('../models/channel.js')
module.exports = {
    name: "list",
    description: "List the tickets.",
    options: [],
    perms: {
      user:  []
  },
    run: async (client, interaction) => {

      const _guild = require('../models/guild.js');
      const _lang_data = await _guild.findOne({ guildID: interaction.guild.id })
      const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)

      if (!interaction.member.roles.cache.get(_lang_data.ticket_role)) return;
      
      const _channel = await channelData.find({guildID: interaction.guild.id})

      
      let _desc = ''
        _channel?.map((x, index) => {
        _desc += `Bilet kanalı: <#${x.channelID}>\nKanal kimliği: \`${x.channelID}\`\nBilet kurucusu: <@${x.creatorID}>\nKurucu kimliği: \`${x.creatorID}\`\n\n`
      }).join("\n")
    const listEmbed = new MessageEmbed()
      .setColor(client.config.bot.embeds.colors.violet)
      .setAuthor({name: client.user.username, iconURL: client.user.avatarURL({dynamic:true})})
      .setDescription(_desc)
      await interaction.reply({
        embeds: [ listEmbed ],
        ephemeral: true
    });
    }
}