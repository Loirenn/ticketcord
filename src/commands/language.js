const Discord = require('discord.js');
const moment = require('moment');
const guildData = require("../models/guild.js");

const _languages_array = [
    { flag: "tr", name: "Türkçe" },
    { flag: "en", name: "English" }
]

module.exports = {
    name: "language",
    description: "Change your server language.",
    options: [
        {
            type: 3,
            name: "language",
            description: "Select language.",
            required: true,
            choices: _languages_array.map(__lang => {
                return {
                  value: __lang.flag,
                  name: " "+ __lang.name +" "
                }
            })
        }
    ],
    perms: {
        user:  ["ADMINISTRATOR"]
    },
    run: async (client, interaction, args) => {
      
        const _interaction_data = interaction.options.get("language");

        await guildData.updateOne({ guildID: interaction.guild.id }, {$set: {language: _interaction_data.value}}, { upsert: true });
        const _lang_data = await guildData.findOne({ guildID: interaction.guild.id });
        const _lang = require(`../lang/${_lang_data.language}.js`);
    
        await interaction.success(_lang.bot.language.change);
      
    },
}
