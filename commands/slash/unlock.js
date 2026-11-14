const SlashCommand=require("../../lib/SlashCommand");
module.exports=new SlashCommand().setName("unlock").setDescription("Unlock this text channel")
.setRun(async(client,i)=>{
 if(!i.memberPermissions.has("MANAGE_CHANNELS"))return i.reply({content:"You need Manage Channels permission.",ephemeral:true});
 try{await i.channel.permissionOverwrites.edit(i.guild.roles.everyone,{SEND_MESSAGES:null},{reason:"Unlocked by "+i.user.tag});return i.reply({content:"🔓 Channel unlocked."});}
 catch{return i.reply({content:"Couldn't unlock this channel. Check my Manage Channels permission.",ephemeral:true});}
});
