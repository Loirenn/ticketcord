module.exports = {
  global: {
    error: "Error",
    success: "Success",
    areYouSure: "Are you sure",
    confirm: "Confirm",
    decline: "Decline"
  },
  bot: {
    info: {
      stats: {
          name: "Stats",
          guilds: "Servers",
          users: "Users",
          channels: "Channels",
      },
      versions: {
          name: "Versions",
      },
      pings: {
          name: "Pings"
      },  
    },
    help: {
      author: "Change server language",
      description: "If you want to change the {client_username} language on **this server**, just type \`/language\`.",
      author2: "How to set up a Ticket system",
      description2: "To setup the ticket system, type `/ticket` and do the required steps."
    },
  ticket: {
    button: {
      close: "Close",
      force: "Force close",
      blacklist: "Black list"
    },
    log: {
      title: "Ticket logs",
      closeDescription: "Operation: `Close the ticket`\nPerson of closed the ticket: <@{user_id}>\nPerson of closed the ticket ID: `{user_id_2}`\nTicket owner: <@{creator_id}>\nOwner ID: `{creator_id_2}`\nTicket Number: `{ticket_code}`"
    },
    blacklist: {
      blackListErr: "You cannot open a **ticket** because you have been **blacklisted** on this server.",
      ownerErr: "Server owners cannot be added to the **blacklist**.",
      botErr: "Robots cannot be added to the **blacklist**.",
      success: "<@{user}> has been successfully added to the **blacklist**.",
      auErr: "This user is already blacklisted.",
      channelMsg: "> What is going on here?\n  `-` Obviously a user has been **blacklisted**. The channel was not **deleted** so that the messages remained saved."
    },
    whitelist: {
      auErr: "This user is not already **blacklisted**.",
      success: "<@{user}> was successfully removed from the **blacklist**."
    },
    firstTicket: "<:award_confetti:953969846851366933> Congratulations! You opened the **first** ticket for the `{guild_name}` server. <#{channel}>",
    ticketCreated: "Your ticket has been successfully created! <#{channel_id}>",
    limitErr: "This server has reached its total ticket limit. Please wait for a ticket to be closed and try again.",
    closeAreYouSure: "> Are you sure you want to close this ticket? This action cannot be **reverted**.",
    timeFormat: 'D [day], H [hour], m [minute], s [second]',
    channelCreateMessage: ":wave: Hello, <@{user}>\nYour ticket has been successfully opened. Please wait **patiently** while the staffs arrive.\n> The staffs on this server respond to the ticket within an average of `{response_time}`.",
    ticketButton: "Create ticket",
    createTicket: "Click button and create **ticket**.",
    success: "The ticket system has been set up successfully!",
    areYouSure: "> Are you sure? The ticket channel will be set to <#{channel_id}> and its staff role to <@&{role_id}>. A **Ticket opening** message will be sent to the set channel.",
    channelErr: "You must tag a **channel** to use this command.",
    roleErr: "You must tag a **role** to use this command."
  },
  language: {
    change: "Your server language successfully changed."
  },
    permErr: "You do not have the required permissions to **use** this command."
  }
}