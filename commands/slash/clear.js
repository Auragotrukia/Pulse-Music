const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("clear").setDescription("Delete recent messages (Manage Messages required)")
.addIntegerOption(o=>o.setName("amount").setDescription("Number of messages (1–100)").setRequired(true).setMinValue(1).setMaxValue(100))
.setRun(async (client, interaction, options) => {
 if(!interaction.memberPermissions.has("MANAGE_MESSAGES")) return interaction.reply({content:"You need Manage Messages permission.",ephemeral:true});
 const n=options.getInteger("amount"); await interaction.deferReply({ephemeral:true});
 try { const deleted=await interaction.channel.bulkDelete(n,true); return interaction.editReply("Deleted "+deleted.size+" recent messages. Messages older than 14 days are skipped by Discord."); }
 catch { return interaction.editReply("I couldn't delete messages here. Check my Manage Messages permission."); }
});
