const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const LoadCommands = require("../util/loadCommands");
module.exports = async (client) => {
  client.manager.init(client.user.id);
  client.user.setPresence(client.config.presence);
  client.log("Successfully Logged in as " + client.user.tag);
  try {
    const commands = await LoadCommands().then(cmds => [].concat(cmds.slash).concat(cmds.context));
    const rest = new REST({ version: "9" }).setToken(client.config.token);
    await rest.put(Routes.applicationCommands(client.config.clientId), { body: commands });
    client.log("Registered " + commands.length + " application commands.");
  } catch (error) {
    client.error("Slash command registration failed: " + error.message);
  }
};
