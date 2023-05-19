const {MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
module.exports = {
    name: "ticket",
    description: "Take action on the ticket system.",
    options: [
      {
        type: 7,
        name: "channel",
        description: "Tag the ticket channel.",
        required: true
      },
      {
        type: 8,
        name: "staff",
        description: "Tag the staff role.",
        required: true
      },
      /*{
        type: 7,
        name: "log",
        description: "Tag the log channel."
      }*/
    ],
    perms: {
      user:  ["ADMINISTRATOR"]
  },
    run: async (client, interaction) => {

      const _guild = require('../models/guild.js');
      const _lang_data = await _guild.findOne({ guildID: interaction.guild.id })
      const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)

      const _hoistedOptions = interaction.options._hoistedOptions;

      
      if(_hoistedOptions[0].channel.type !== "GUILD_TEXT") return interaction.error(_lang.bot.ticket.channelErr);
      if(_hoistedOptions[2]) {
                        if(_hoistedOptions[2].channel.type !== "GUILD_TEXT") return interaction.error(_lang.bot.ticket.channelErr); 
      }
      if(_hoistedOptions[1].role.name === "@everyone") return interaction.error(_lang.bot.ticket.roleErr);

      interaction.areYouSure(_lang.bot.ticket.areYouSure.replace("{channel_id}", _hoistedOptions[0].channel.id).replace("{role_id}", _hoistedOptions[1].role.id), 
      new MessageActionRow()
        .addComponents(
        new MessageButton()
        .setLabel(_lang.global.confirm)
        .setCustomId("ARE_YOU_SURE_TICKET_CONFIRM")
        .setStyle("PRIMARY"),
        new MessageButton()
        .setLabel(_lang.global.decline)
        .setCustomId("ARE_YOU_SURE_TICKET_DECLINE")
        .setStyle("DANGER"),
       )
      )
      
      const _collector = interaction.channel.createMessageComponentCollector({time: 90000 });
      let _user_button_clicked = false

      _collector.on('collect', async i => {
        if(i.customId === "ARE_YOU_SURE_TICKET_CONFIRM") {
          if (_user_button_clicked || i.user.id != interaction.user.id) return;
          interaction.successEdit(_lang.bot.ticket.success);
          if(_hoistedOptions[2]) {
          await _guild.updateOne({ guildID: interaction.guild.id }, {$set: {
            ticket_channel: _hoistedOptions[0].channel.id,
            ticket_role: _hoistedOptions[1].role.id,
            ticket_log: _hoistedOptions[2].channel.id
          }},{ upsert: true }) 
          }
          await _guild.updateOne({ guildID: interaction.guild.id }, {$set: {
            ticket_channel: _hoistedOptions[0].channel.id,
            ticket_role: _hoistedOptions[1].role.id,
          }},{ upsert: true }) 
          client.guilds.cache.get(interaction.guild.id).channels.cache.get(_hoistedOptions[0].channel.id).send({embeds: [
            new MessageEmbed()
            .setColor(client.config.bot.embeds.colors.violet)
            .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL() == null ? client.user.avatarURL() : interaction.guild.iconURL({dynamic:true})})
            .setDescription(_lang.bot.ticket.createTicket)
          ], 
          components: [
            new MessageActionRow()
            .addComponents(
              new MessageButton()
              .setCustomId("CREATE_TICKET")
              .setLabel(_lang.bot.ticket.ticketButton)
              .setStyle("SECONDARY")
              .setEmoji("🎫")
            )
          ]
          }).then((async msg => {
            await _guild.updateOne({ guildID: interaction.guild.id }, {$set: {
            ticket_messageID: msg.id,
          }}, { upsert: true })
          }))
          _user_button_clicked = true
        }
        if(i.customId === "ARE_YOU_SURE_TICKET_DECLINE") {
          if (_user_button_clicked || i.user.id != interaction.user.id) return;
          await interaction.deleteReply()
          _user_button_clicked = true
          
        }
      })
  }
}