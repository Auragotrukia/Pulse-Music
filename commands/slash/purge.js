const SlashCommand=require("../../lib/SlashCommand");
module.exports=new SlashCommand().setName("purge").setDescription("Bulk-delete recent messages")
.addIntegerOption(o=>o.setName("amount").setDescription("1–100 messages").setRequired(true).setMinValue(1).setMaxValue(100))
.setRun(async(client,i,o)=>{
 if(!i.memberPermissions.has("MANAGE_MESSAGES"))return i.reply({content:"You need Manage Messages permission.",ephemeral:true});
 await i.deferReply({ephemeral:true});
 try{const deleted=await i.channel.bulkDelete(o.getInteger("amount"),true);return i.editReply("Deleted "+deleted.size+" messages (messages older than 14 days are skipped).");}
 catch{return i.editReply("Purge failed. Check my Manage Messages permission.");}
});
