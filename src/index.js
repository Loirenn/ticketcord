const Client = require('./client');
const config = require('./config');
const client = global.client = new Client({ intents: config.bot.intents });


// start bot
client.init();

