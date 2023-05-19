module.exports = (client, config) => {
  client.on('ready', () => {
      client.user.setStatus(config.bot.presence.status);
      client.user.setActivity(config.bot.presence.activity.replace("{guild}", client.guilds.cache.size), {
        type: config.bot.presence.type,
      });
    })
};