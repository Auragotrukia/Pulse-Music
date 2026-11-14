const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");
const { getPrefix, setPrefix } = require("../../util/guildDb");
module.exports = new SlashCommand().setName("prefix").setDescription("View or change this server's text-command prefix")
.addSubcommand(s=>s.setName("show").setDescription("Show the current prefix"))
.addSubcommand(s=>s.setName("set").setDescription("Set a new prefix").addStringOption(o=>o.setName("value").setDescription("1–5 characters").setRequired(true)))
.addSubcommand(s=>s.setName("reset").setDescription("Reset the prefix to !"))
.setRun(async (client, interaction, options) => {
 if(!interaction.guild) return interaction.reply({content:"Use this in a server.",ephemeral:true});
 const sub=options.getSubcommand();
 if(sub==="show") return interaction.reply({content:"Current prefix: `"+getPrefix(interaction.guild.id)+"`",ephemeral:true});
 if(!interaction.memberPermissions.has("MANAGE_GUILD")) return interaction.reply({content:"You need Manage Server permission to change the prefix.",ephemeral:true});
 if(sub==="reset"){setPrefix(interaction.guild.id,"!");return interaction.reply({content:"Prefix reset to `!`",ephemeral:true});}
 const value=options.getString("value").trim();
 if(!/^\\S{1,5}$/.test(value)) return interaction.reply({content:"Prefix must be 1–5 characters with no spaces.",ephemeral:true});
 setPrefix(interaction.guild.id,value);
 return interaction.reply({embeds:[new MessageEmbed().setColor(client.config.embedColor).setTitle("Prefix updated").setDescription("New prefix: `"+value+"`")]});
});
