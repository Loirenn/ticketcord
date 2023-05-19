const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Collection } = require("discord.js");
const { connect } = require("mongoose");
const config = require("../config");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const _commands = [];
const __commands_global = new Collection();

module.exports = class Bot extends Client {
  get config() {
    return require("../config");
  }

  async init() {
    fs.readdir(config.cmdDir, (err, commands) => {
      if (err) throw new Error(err);
      commands.forEach(async (command) => {
        try {
          const _cmdFile = require("../." + config.cmdDir + "/" + command);
          const { name, description, options } =
            typeof _cmdFile == "function" ? _cmdFile(this) : _cmdFile;
          _commands.push({ name, description, options });
          const __command = require(`../commands/${command}`);
          __commands_global.set(__command.name, __command);
        } catch (err) {
          console.error(err);
        }
      });
    });

    global.commands = __commands_global.toJSON();
    const rest = new REST({ version: "9" }).setToken(config.bot.token);

    this.once("ready", async () => {
      try {
        console.log("(!) - Loading Application commands..");
        await rest.put(Routes.applicationCommands(this.user.id), {
          body: _commands,
        });
        console.log("(!) - Application Commands loaded!");
      } catch (err) {
        console.error(err);
      }
    });

    this.on("interactionCreate", async (interaction) => {
      try {
        if (!interaction.isCommand()) return;
        
        const _guild = require('../models/guild.js');
        const _lang_data = await _guild.findOne({ guildID: interaction.guild.id })
        const _lang = require(`../lang/${_lang_data?.language || "en"}.js`)
          
        const __commands = __commands_global.get(
          interaction.commandName.toLowerCase()
        );
        if (
          __commands.perms.user.length != 0 &&
          !__commands.perms.user.every((perm) =>
            interaction.member.permissions.has(perm)
          )
        ) {
          return interaction.error(_lang.bot.permErr);
        }
        fs.readdir(config.cmdDir, (err, commands) => {
          if (err) throw new Error(err);
          commands.forEach(async (command) => {
            const _command = require("../." + config.cmdDir + "/" + command);
            if (
              interaction.commandName.toLowerCase() ===
              _command.name.toLowerCase()
            )
              _command.run(this, interaction);
          });
        });
      } catch (err) {
        console.error(err);
      }
    });

    fs.readdir("./src/events", (err, files) => {
      if (files) {
        let loadedEvents = 0;
        console.log(`(!) - ${files.length} event found, loading..`);
        files.forEach((file) => {
          loadedEvents++;
          require(`${process.cwd()}/${"./src/events"}/${file}`)(this, config);
          if (loadedEvents == files.length)
            console.log(`(!) - All events loaded! (${files.length})`);
        });
      }
    });

    function LoadUtils(names) {
      names.forEach(name => {
        require('../util/' + name + '.js')(this, config);
      })
    }

    LoadUtils([
      "shortcut"
    ])

    
    this.login(config.bot.token)
      .then(() => {
        console.log("(!) - Connected to Discord as " + this.user.tag + "!");
      })
      .catch((err) => {
        console.error(err);
      });

    connect(config.database.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    })
      .then(() => {
        console.log("(!) - Connected to database!");
      })
      .catch((a) => console.error("(!) - Could not connect to database.", a));
  }

};
