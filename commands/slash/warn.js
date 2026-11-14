const SlashCommand=require("../../lib/SlashCommand");
const {getGuildData,setGuildData}=require("../../util/guildDb");
module.exports=new SlashCommand().setName("warn").setDescription("Warn a member and save the warning")
.addUserOption(o=>o.setName("user").setDescription("Member to warn").setRequired(true))
.addStringOption(o=>o.setName("reason").setDescription("Reason").setRequired(true))
.setRun(async(client,i,o)=>{
 if(!i.memberPermissions.has("MANAGE_MESSAGES"))return i.reply({content:"You need Manage Messages permission.",ephemeral:true});
 const user=o.getUser("user"),reason=o.getString("reason");
 if(user.bot||user.id===i.user.id)return i.reply({content:"Choose another member.",ephemeral:true});
 const data=getGuildData(i.guild.id),warnings=data.warnings||{};
 warnings[user.id]=warnings[user.id]||[];
 warnings[user.id].push({reason,moderator:i.user.id,at:Date.now()});
 setGuildData(i.guild.id,{warnings});
 return i.reply({content:"⚠️ Warned **"+user.tag+"**. Total warnings: "+warnings[user.id].length,ephemeral:true});
});
