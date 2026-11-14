const SlashCommand=require("../../lib/SlashCommand");
const {getGuildData}=require("../../util/guildDb");
module.exports=new SlashCommand().setName("warnings").setDescription("View a member's saved warnings")
.addUserOption(o=>o.setName("user").setDescription("Member").setRequired(true))
.setRun(async(client,i,o)=>{
 if(!i.memberPermissions.has("MANAGE_MESSAGES"))return i.reply({content:"You need Manage Messages permission.",ephemeral:true});
 const user=o.getUser("user"),list=(getGuildData(i.guild.id).warnings||{})[user.id]||[];
 if(!list.length)return i.reply({content:user.tag+" has no saved warnings.",ephemeral:true});
 const lines=list.slice(-10).map((w,n)=>(n+1)+". "+w.reason+" — <@"+w.moderator+">");
 return i.reply({content:"**Warnings for "+user.tag+"**\\n"+lines.join("\\n"),ephemeral:true});
});
