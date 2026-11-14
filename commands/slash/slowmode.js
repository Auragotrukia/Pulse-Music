const SlashCommand=require("../../lib/SlashCommand");
module.exports=new SlashCommand().setName("slowmode").setDescription("Set this channel's slowmode")
.addIntegerOption(o=>o.setName("seconds").setDescription("0–21600 seconds").setRequired(true).setMinValue(0).setMaxValue(21600))
.setRun(async(client,i,o)=>{
 if(!i.memberPermissions.has("MANAGE_CHANNELS"))return i.reply({content:"You need Manage Channels permission.",ephemeral:true});
 try{await i.channel.setRateLimitPerUser(o.getInteger("seconds"),"Set by "+i.user.tag);return i.reply({content:"Slowmode set to "+o.getInteger("seconds")+" seconds.",ephemeral:true});}
 catch{return i.reply({content:"Couldn't change slowmode. Check my Manage Channels permission.",ephemeral:true});}
});
