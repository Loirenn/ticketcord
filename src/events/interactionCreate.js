const serverData = require("../models/guild.js");
const channelData = require("../models/channel.js");
const blackListData = require("../models/blacklist.js");

const {
    MessageEmbed,
    Collection,
    MessageButton,
    MessageActionRow,
} = require("discord.js");

const listening = new Collection();
const moment = require("moment");
require("moment-duration-format");

module.exports = (client, config) => {
    client.on("messageCreate", async (message) => {
        const channel = listening.get(message.channel.id);
        if (!channel) return;
        if (!message.member.roles.cache.get(channel.role)) return;
        listening.delete(message.channel.id);

        let ms = Date.now() - channel.start;
        let g = await serverData.findOne({ guildID: message.guild.id });
        let total = Math.max(0, g.total_tickets - 1) * g.response_time + ms;
        let averange = Math.round(total / g.total_tickets);
        await serverData.updateOne(
            { guildID: message.guild.id },
            { response_time: averange }
        );
    });

    client.on("interactionCreate", async (interaction) => {
        if (interaction.type !== "MESSAGE_COMPONENT") return;
        if (interaction.componentType !== "BUTTON") return;

        const _data = await serverData.findOne({
            guildID: interaction.guild.id,
        });

        let _channel_data = await channelData.findOne({
            channelID: interaction.channel.id,
        });

        let _blacklist_data = await blackListData.findOne({
           user: interaction.user.id 
        });

        const _lang = require(`../lang/${_data?.language || "en"}.js`);

        if (interaction.customId === "CREATE_TICKET") {
            if(_blacklist_data) 
                return interaction.reply({
                content: `${_lang.bot.ticket.blacklist.blackListErr}`,
                ephemeral: true
            });
            if (_data.ticket_limits === config.ticket.limit)
                return interaction.reply({
                    content: _lang.bot.ticket.limitErr,
                    ephemeral: true,
                });
            await serverData.updateOne(
                { guildID: interaction.guild.id },
                {
                    $inc: {
                        total_tickets: 1,
                        ticket_limits: 1,
                    },
                }
            );

            let _channel = await interaction.guild.channels.create(
                `ticket-${_data?.total_tickets + 1}`,
                {
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: [
                                "SEND_MESSAGES",
                                "VIEW_CHANNEL",
                                "ATTACH_FILES",
                            ],
                        },
                        {
                            id: _data.ticket_role,
                            allow: [
                                "SEND_MESSAGES",
                                "VIEW_CHANNEL",
                                "ATTACH_FILES",
                            ],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"],
                        },
                    ],
                }
            );

            await new channelData({
                guildID: interaction.guild.id,
                channelID: _channel.id,
                creatorID: interaction.user.id,
            }).save();

            if (_data.total_tickets === 0) {
                interaction.reply({
                    content: _lang.bot.ticket.firstTicket
                        .replace("{guild_name}", interaction.guild.name)
                        .replace("{channel}", _channel.id),
                    ephemeral: true,
                });
            } else {
                interaction.reply({
                    content: _lang.bot.ticket.ticketCreated.replace(
                        "{channel_id}",
                        _channel.id
                    ),
                    ephemeral: true,
                });
            }

            listening.set(_channel.id, {
                role: _data.ticket_role,
                start: Date.now(),
            });

            _channel.send({
                content: `<@&${_data.ticket_role}>`,
                embeds: [
                    new MessageEmbed()
                        .setColor(config.bot.embeds.colors.violet)
                        .setDescription(
                            _lang.bot.ticket.channelCreateMessage
                                .replace("{user}", interaction.user.id)
                                .replace(
                                    "{response_time}",
                                    moment
                                        .duration(_data.response_time)
                                        .format(_lang.bot.ticket.timeFormat)
                                )
                        )
                        .setAuthor({
                            name: interaction.user.tag,
                            iconURL: interaction.user.avatarURL(),
                        })
                        .setFooter({ text: client.user.username })
                        .setTimestamp(),
                ],
                components: [
                    new MessageActionRow().addComponents(
                        new MessageButton()
                            .setLabel(_lang.bot.ticket.button.close)
                            .setCustomId("CLOSE_TICKET")
                            .setStyle("DANGER"),
                        new MessageButton()
                            .setLabel(_lang.bot.ticket.button.force)
                            .setCustomId("FORCE_CLOSE_TICKET")
                            .setStyle("SECONDARY")
                            .setEmoji("🔒"),
                        new MessageButton()
                            .setLabel(_lang.bot.ticket.button.blacklist)
                            .setCustomId("BLACKLIST_USER_TICKET")
                            .setStyle("SECONDARY")
                            .setEmoji("🔒")
                    ),
                ],
            });
            return;
        }

        if (interaction.customId === "CLOSE_TICKET") {
            interaction.areYouSure(
                _lang.bot.ticket.closeAreYouSure,
                new MessageActionRow().addComponents(
                    new MessageButton()
                        .setLabel(_lang.global.confirm)
                        .setCustomId("ARE_YOU_SURE_TICKET_CLOSE_CONFIRM")
                        .setStyle("PRIMARY"),
                    new MessageButton()
                        .setLabel(_lang.global.decline)
                        .setCustomId("ARE_YOU_SURE_TICKET_CLOSE_DECLINE")
                        .setStyle("DANGER")
                )
            );
            const _collector =
                interaction.channel.createMessageComponentCollector(true, {
                    time: 90000,
                });
            let _user_button_clicked = false;
            _collector.on("collect", async (i) => {
                if (i.customId === "ARE_YOU_SURE_TICKET_CLOSE_CONFIRM") {
                    if (
                        _user_button_clicked ||
                        i.user.id != interaction.user.id
                    )
                        return i.deferUpdate();
                    if (_data?.ticket_log) {
                        client.guilds.cache
                            .get(interaction.guild.id)
                            .channels.cache.get(_data.ticket_log)
                            .send({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor(
                                            config.bot.embeds.colors.violet
                                        )
                                        .setTitle(
                                            "⚙️ | " + _lang.bot.ticket.log.title
                                        )
                                        .setDescription(
                                            _lang.bot.ticket.log.closeDescription
                                                .replace(
                                                    "{user_id}",
                                                    interaction.user.id
                                                )
                                                .replace(
                                                    "{creator_id}",
                                                    _channel_data.creatorID
                                                )
                                                .replace(
                                                    "{ticket_code}",
                                                    _data.total_tickets
                                                )
                                                .replace(
                                                    "{user_id_2}",
                                                    interaction.user.id
                                                )
                                                .replace(
                                                    "{creator_id_2}",
                                                    _channel_data.creatorID
                                                )
                                        ),
                                ],
                            });
                    }
                    _data.ticket_limits === 0
                        ? ""
                        : await serverData.updateOne(
                              { guildID: interaction.guild.id },
                              {
                                  $inc: {
                                      ticket_limits: -1,
                                  },
                              }
                          );
                    await channelData.deleteOne({
                        channelID: interaction.channel.id,
                    });
                    await interaction.channel.delete();
                    _user_button_clicked = true;
                }
                if (i.customId === "ARE_YOU_SURE_TICKET_CLOSE_DECLINE") {
                    if (
                        _user_button_clicked ||
                        i.user.id != interaction.user.id
                    )
                        return i.deferUpdate();
                    await interaction.deleteReply();
                    _user_button_clicked = true;
                }
            });
            return;
        }
        if (interaction.customId === "FORCE_CLOSE_TICKET") {
            if (!interaction.member.roles.cache.get(_data.ticket_role)) return;
            let _user_button_clicked = true;
            _data.ticket_limits === 0
                ? ""
                : await serverData.updateOne(
                      { guildID: interaction.guild.id },
                      {
                          $inc: {
                              ticket_limits: -1,
                          },
                      }
                  );
            await channelData.deleteOne({
                channelID: interaction.channel.id,
            });
            await interaction.channel.delete();
            if (_data?.ticket_log) {
                client.guilds.cache
                    .get(interaction.guild.id)
                    .channels.cache.get(_data.ticket_log)
                    .send({
                        embeds: [
                            new MessageEmbed()
                                .setColor(config.bot.embeds.colors.violet)
                                .setTitle("⚙️ | " + _lang.bot.ticket.log.title)
                                .setDescription(
                                    _lang.bot.ticket.log.closeDescription
                                        .replace(
                                            "{user_id}",
                                            interaction.user.id
                                        )
                                        .replace(
                                            "{creator_id}",
                                            _channel_data.creatorID
                                        )
                                        .replace(
                                            "{ticket_code}",
                                            _data.total_tickets
                                        )
                                        .replace(
                                            "{user_id_2}",
                                            interaction.user.id
                                        )
                                        .replace(
                                            "{creator_id_2}",
                                            _channel_data.creatorID
                                        )
                                ),
                        ],
                    });
            }
        }

        if (interaction.customId === "BLACKLIST_USER_TICKET") {
            if (!interaction.member.roles.cache.get(_data.ticket_role)) return;
            let _channel_owner = await channelData.findOne({
                channelID: interaction.channel.id,
            });

            let _check_blacklist = await blackListData.findOne({
                user: _channel_owner.creatorID,
            });

            if (_check_blacklist)
                return interaction.reply({
                    content: _lang.bot.ticket.blacklist.auErr,
                    ephemeral: true,
                });

            await new blackListData({
                guildID: interaction.guild.id,
                staff: interaction.user.id,
                user: _channel_owner.creatorID,
                date: new Date(),
            }).save();

            interaction.reply({
                content: _lang.bot.ticket.blacklist.success.replace(
                    "{user}",
                    _channel_owner.creatorID
                ),
                ephemeral: true,
            });

            interaction.channel.permissionOverwrites.edit(
                _channel_owner.creatorID,
                {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false,
                    ATTACH_FILES: false,
                }
            );

            interaction.channel.send({
                content: _lang.bot.ticket.blacklist.channelMsg,
                components: [
                    new MessageActionRow().addComponents(
                        new MessageButton()
                            .setLabel(_lang.bot.ticket.button.force)
                            .setCustomId("FORCE_CLOSE_TICKET")
                            .setStyle("SECONDARY")
                            .setEmoji("🔒")
                    ),
                ],
            });
        }
    });
};
