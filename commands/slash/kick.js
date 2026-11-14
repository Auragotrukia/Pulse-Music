const SlashCommand=require("../../lib/SlashCommand");
module.exports=new SlashCommand().setName("kick").setDescription("Kick a member from this server")
.addUserOption(o=>o.setName("user").setDescription("Member to kick").setRequired(true))
.addStringOption(o=>o.setName("reason").setDescription("Reason").setRequired(false))
.setRun(async(client,i,o)=>{
 if(!i.memberPermissions.has("KICK_MEMBERS")) return i.reply({content:"You need Kick Members permission.",ephemeral:true});
 const user=o.getUser("user"),reason=o.getString("reason")||"No reason provided";
 try{const m=await i.guild.members.fetch(user.id);if(!m.kickable)throw Error();await m.kick(reason+" | By "+i.user.tag);return i.reply({content:"Kicked **"+user.tag+"**. Reason: "+reason,ephemeral:true});}
 catch{return i.reply({content:"Kick failed. Check my Kick Members permission and role hierarchy.",ephemeral:true});}
});
