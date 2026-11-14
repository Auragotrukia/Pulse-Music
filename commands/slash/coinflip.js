const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("coinflip").setDescription("Flip a coin")
.setRun(async (client, interaction) => {
 const result=Math.random()<0.5?"Heads":"Tails";
 return interaction.reply({embeds:[new MessageEmbed().setColor(client.config.embedColor).setTitle("🪙 Coin flip").setDescription("**"+result+"**").setFooter({text:"Flipped by "+interaction.user.tag})]});
});
