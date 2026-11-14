const SlashCommand=require("../../lib/SlashCommand");
module.exports=new SlashCommand().setName("lock").setDescription("Lock this text channel")
.setRun(async(client,i)=>{
 if(!i.memberPermissions.has("MANAGE_CHANNELS"))return i.reply({content:"You need Manage Channels permission.",ephemeral:true});
 try{await i.channel.permissionOverwrites.edit(i.guild.roles.everyone,{SEND_MESSAGES:false},{reason:"Locked by "+i.user.tag});return i.reply({content:"🔒 Channel locked."});}
 catch{return i.reply({content:"Couldn't lock this channel. Check my Manage Channels permission.",ephemeral:true});}
});
