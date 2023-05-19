module.exports = (client, config) => {
  client.on('guildCreate', (guild) => {
        client.channels.cache.get("952350433932898316").send("Ticketcord "+ guild.name +" sunucusuna eklendi!")
        client.user.setActivity(config.bot.presence.activity.replace("{guild}", client.guilds.cache.size), {
            type: config.bot.presence.type,
          });
    })
};