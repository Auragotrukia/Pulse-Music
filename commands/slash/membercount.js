const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("membercount").setDescription("Show this server's member count")
.setRun(async (client, interaction) => {
 const g=interaction.guild;
 if(!g) return interaction.reply({content:"Use this command inside a server.",ephemeral:true});
 await g.members.fetch().catch(()=>null);
 return interaction.reply({embeds:[new MessageEmbed().setColor(client.config.embedColor).setTitle(g.name+" — Members").setDescription("**"+g.memberCount+"** members").setThumbnail(g.iconURL({dynamic:true,size:256}))]});
});
