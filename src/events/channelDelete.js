const channelData = require("../models/channel.js");
const guildData = require("../models/guild.js");

module.exports = (client, config) => {
    client.on("channelDelete", async (channel) => {
        const _guild = await guildData.findOne({
            guildID: channel.guild.id,
        });
        const _channel = await channelData.findOne({
            channelID: channel.id,
        });
        if (channel.id === _guild?.ticket_log) {
            await guildData.updateOne(
                { guildID: channel.guild.id },
                {
                    $set: {
                        ticket_log: null,
                    },
                },
                { upsert: true }
            );
        }
        if (channel.id === _channel?.channelID) {
            guildData?.ticket_limits === 0
                ? ""
                : await guildData.updateOne(
                      { guildID: channel.guild.id },
                      {
                          $inc: {
                              ticket_limits: -1,
                          },
                      }
                  );
            await channelData.deleteOne({
                channelID: channel.id,
            });
        }
    });
};
