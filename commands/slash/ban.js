const SlashCommand=require("../../lib/SlashCommand");
module.exports=new SlashCommand().setName("ban").setDescription("Ban a member from this server")
.addUserOption(o=>o.setName("user").setDescription("Member to ban").setRequired(true))
.addStringOption(o=>o.setName("reason").setDescription("Reason").setRequired(false))
.setRun(async(client,i,o)=>{
 if(!i.memberPermissions.has("BAN_MEMBERS")) return i.reply({content:"You need Ban Members permission.",ephemeral:true});
 const user=o.getUser("user"),reason=o.getString("reason")||"No reason provided";
 if(user.id===i.user.id||user.id===client.user.id) return i.reply({content:"I can't ban that user.",ephemeral:true});
 try{await i.guild.members.ban(user,{reason:reason+" | By "+i.user.tag});return i.reply({content:"Banned **"+user.tag+"**. Reason: "+reason,ephemeral:true});}
 catch{return i.reply({content:"Ban failed. Check my Ban Members permission and role hierarchy.",ephemeral:true});}
});
