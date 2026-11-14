const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("poll").setDescription("Create a yes/no poll")
.addStringOption(o=>o.setName("question").setDescription("Poll question").setRequired(true))
.setRun(async (client, interaction, options) => {
 const q=options.getString("question"); if(q.length>250) return interaction.reply({content:"Keep the question under 250 characters.",ephemeral:true});
 const msg=await interaction.reply({embeds:[new MessageEmbed().setColor(client.config.embedColor).setTitle("Poll").setDescription(q).setFooter({text:"Poll by "+interaction.user.tag})],fetchReply:true});
 await msg.react("👍"); await msg.react("👎");
});
