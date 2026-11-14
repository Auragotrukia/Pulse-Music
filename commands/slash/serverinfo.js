const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("serverinfo").setDescription("Show information about this server")
.setRun(async (client, interaction) => {
 const g=interaction.guild; if(!g) return interaction.reply({content:"This command only works in a server.",ephemeral:true});
 const e=new MessageEmbed().setColor(client.config.embedColor).setTitle(g.name).setThumbnail(g.iconURL({dynamic:true,size:256}))
 .addFields({name:"Owner",value:"<@"+g.ownerId+">",inline:true},{name:"Members",value:String(g.memberCount),inline:true},
 {name:"Channels",value:String(g.channels.cache.size),inline:true},{name:"Roles",value:String(g.roles.cache.size),inline:true},
 {name:"Created",value:"<t:"+Math.floor(g.createdTimestamp/1000)+":R>",inline:true},{name:"Boosts",value:String(g.premiumSubscriptionCount||0),inline:true})
 .setFooter({text:"Server ID: "+g.id});
 return interaction.reply({embeds:[e],ephemeral:true});
});
