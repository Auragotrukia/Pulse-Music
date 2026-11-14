const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("roll").setDescription("Roll a number between two limits")
.addIntegerOption(o=>o.setName("min").setDescription("Minimum (default 1)").setRequired(false))
.addIntegerOption(o=>o.setName("max").setDescription("Maximum (default 100)").setRequired(false))
.setRun(async (client, interaction, options) => {
 const min=options.getInteger("min")??1, max=options.getInteger("max")??100;
 if(min>=max || max-min>1000000) return interaction.reply({content:"Choose a valid range (max must be greater; range up to 1,000,000).",ephemeral:true});
 const n=Math.floor(Math.random()*(max-min+1))+min;
 return interaction.reply({embeds:[new MessageEmbed().setColor(client.config.embedColor).setTitle("🎲 Dice roll").setDescription("**"+n+"**").setFooter({text:"Range: "+min+"–"+max})]});
});
