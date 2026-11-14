const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("botinfo").setDescription("Show Pulse bot information")
.setRun(async (client, interaction) => {
 const e=new MessageEmbed().setColor(client.config.embedColor).setTitle("Pulse Music")
 .setThumbnail(client.user.displayAvatarURL({dynamic:true,size:256}))
 .setDescription("Music and multitasking utilities.")
 .addFields({name:"Servers",value:String(client.guilds.cache.size),inline:true},{name:"Users cached",value:String(client.users.cache.size),inline:true},
 {name:"Ping",value:client.ws.ping+" ms",inline:true},{name:"Uptime",value:Math.floor(client.uptime/86400000)+"d "+Math.floor(client.uptime/3600000)%24+"h "+Math.floor(client.uptime/60000)%60+"m",inline:true})
 .setFooter({text:"Pulse Music"});
 return interaction.reply({embeds:[e]});
});
