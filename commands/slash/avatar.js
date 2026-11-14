const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("avatar").setDescription("Show a user's avatar")
.addUserOption(o=>o.setName("user").setDescription("User").setRequired(false))
.setRun(async (client, interaction, options) => {
 const u=options.getUser("user")||interaction.user; const url=u.displayAvatarURL({dynamic:true,size:1024});
 return interaction.reply({embeds:[new MessageEmbed().setColor(client.config.embedColor).setTitle(u.tag+"'s avatar").setImage(url).setURL(url)],ephemeral:true});
});
