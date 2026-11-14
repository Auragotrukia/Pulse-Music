const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("userinfo").setDescription("Show information about a user")
.addUserOption(o=>o.setName("user").setDescription("User to inspect").setRequired(false))
.setRun(async (client, interaction, options) => {
 const u=options.getUser("user")||interaction.user; const m=interaction.guild ? await interaction.guild.members.fetch(u.id).catch(()=>null) : null;
 const e=new MessageEmbed().setColor(client.config.embedColor).setTitle(u.tag).setThumbnail(u.displayAvatarURL({dynamic:true,size:256}))
 .addFields({name:"User ID",value:u.id},{name:"Account created",value:"<t:"+Math.floor(u.createdTimestamp/1000)+":R>",inline:true},
 {name:"Joined server",value:m ? "<t:"+Math.floor(m.joinedTimestamp/1000)+":R>" : "Not available",inline:true},{name:"Bot",value:u.bot?"Yes":"No",inline:true});
 return interaction.reply({embeds:[e],ephemeral:true});
});
