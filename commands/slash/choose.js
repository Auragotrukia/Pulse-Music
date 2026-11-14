const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("choose").setDescription("Pick one option at random")
.addStringOption(o=>o.setName("options").setDescription("Separate options with commas").setRequired(true))
.setRun(async (client, interaction, options) => {
 const choices=options.getString("options").split(",").map(x=>x.trim()).filter(Boolean);
 if(choices.length<2 || choices.length>20 || choices.some(x=>x.length>100)) return interaction.reply({content:"Give 2–20 options, each under 100 characters, separated by commas.",ephemeral:true});
 const choice=choices[Math.floor(Math.random()*choices.length)];
 return interaction.reply({embeds:[new MessageEmbed().setColor(client.config.embedColor).setTitle("🎯 My pick").setDescription("**"+choice+"**").setFooter({text:"Picked from "+choices.length+" options"})]});
});
