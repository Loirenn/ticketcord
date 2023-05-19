module.exports = (client, config) => {
  client = global.client
  const Discord = require("discord.js");
  const { MessageEmbed } = require("discord.js")
  
  const embedd = new MessageEmbed();
  Discord.Interaction.prototype.embed = function (mesaj, { color, title, author, fields, footer, image, thumbnail, timestamp}) {
    if(timestamp) embedd.setTimestamp();
    if(color) embedd.setColor(color)
    if(title) embedd.setTitle(title)
    if(author) embedd.setAuthor(author[0], author[1])
    if(footer) embedd.setFooter(footer[0], footer[1])
    if(image) embedd.setImage(image)
    if(thumbnail) embedd.setThumbnail(thumbnail)
    if(mesaj) embedd.setDescription(mesaj)
    return this.send(embedd);
  };
  
  const embed = new MessageEmbed();
  Discord.Interaction.prototype.error = async function (mesaj) {  
    const _guild = require('../models/guild.js');
    const _lang_data = await _guild.findOne({ guildID: this.guild.id })
    const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)
    embed.setDescription(mesaj)
    embed.setColor(config.bot.embeds.colors.violet)
    embed.setAuthor({name: client.user.username + " " + _lang.global.error, iconURL: client.user.avatarURL()})
    return this.reply({embeds: [embed]});
  };
  
 Discord.Interaction.prototype.success = async function (mesaj) {  
    const _guild = require('../models/guild.js');
    const _lang_data = await _guild.findOne({ guildID: this.guild.id })
    const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)
    embed.setDescription(mesaj)
    embed.setColor(config.bot.embeds.colors.violet)
    embed.setAuthor({name: client.user.username + " " + _lang.global.success, iconURL: client.user.avatarURL()})
    return this.reply({embeds: [embed]});
  };

   Discord.Interaction.prototype.successEdit = async function (mesaj) {  
    const _guild = require('../models/guild.js');
    const _lang_data = await _guild.findOne({ guildID: this.guild.id })
    const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)
    embed.setDescription(mesaj)
    embed.setColor(config.bot.embeds.colors.violet)
    embed.setAuthor({name: client.user.username + " " + _lang.global.success, iconURL: client.user.avatarURL()})
    return this.editReply({embeds: [embed], components: []});
  };
  
 Discord.Interaction.prototype.areYouSure = async function (mesaj, components) {  
    const _guild = require('../models/guild.js');
    const _lang_data = await _guild.findOne({ guildID: this.guild.id })
    const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)
    embed.setDescription(mesaj)
    embed.setColor(config.bot.embeds.colors.violet)
    embed.setAuthor({name: client.user.username + " " + _lang.global.areYouSure, iconURL: client.user.avatarURL()})
    return this.reply({embeds: [embed], components: [components]});
  };
  
};