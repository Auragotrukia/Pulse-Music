const SlashCommand=require("../../lib/SlashCommand");
module.exports=new SlashCommand().setName("timeout").setDescription("Timeout a member for up to 28 days")
.addUserOption(o=>o.setName("user").setDescription("Member to timeout").setRequired(true))
.addIntegerOption(o=>o.setName("minutes").setDescription("Timeout length in minutes (1–40320)").setRequired(true).setMinValue(1).setMaxValue(40320))
.addStringOption(o=>o.setName("reason").setDescription("Reason").setRequired(false))
.setRun(async(client,i,o)=>{
 if(!i.memberPermissions.has("MODERATE_MEMBERS")) return i.reply({content:"You need Timeout Members permission.",ephemeral:true});
 try{const m=await i.guild.members.fetch(o.getUser("user").id);if(!m.moderatable)throw Error();await m.timeout(o.getInteger("minutes")*60000,o.getString("reason")||"No reason provided");return i.reply({content:"Timed out **"+m.user.tag+"** for "+o.getInteger("minutes")+" minutes.",ephemeral:true});}
 catch{return i.reply({content:"Timeout failed. Check my permissions and role hierarchy.",ephemeral:true});}
});
