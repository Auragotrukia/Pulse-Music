const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { get } = require("../util/db");
const { platform, arch } = require("os");

module.exports = async (client, message) => {
  const refront = `^<@!?${client.user.id}>`;
  const mention = new RegExp(refront + "$");
  const debugIdMention = new RegExp(refront + " debug-id ([^\s]+)");
  const invite = `https://discord.com/oauth2/authorize?client_id=${
    client.config.clientId
  }&permissions=${client.config.inviteScopes.toString().replace(/,/g, "%20")}`;

  const buttons = new MessageActionRow().addComponents(
    new MessageButton().setStyle("LINK").setLabel("Invite me").setURL(invite),
    new MessageButton()
      .setStyle("LINK")
      .setLabel("Support server")
      .setURL(`${client.config.supportServer}`)
  );

  if (message.content.match(mention)) {
    const mentionEmbed = new MessageEmbed()
      .setColor(client.config.embedColor)
      .setDescription(
        `My prefix on this server is \`/\` (Slash Command).\nTo get started you can type \`/help\` to see all my commands.\nIf you can't see it, Please [re-invite](invite) me with the correct permissions.`
      );

    message.channel.send({
      embeds: [mentionEmbed],
      components: [buttons],
    });
  }

  if (message.author.bot || !message.guild) return;
  const { getPrefix, setPrefix } = require("../util/guildDb");
  let prefix = "!";
  try { prefix = getPrefix(message.guild.id) || "!"; } catch (error) { client.warn("Prefix lookup failed: " + error.message); }
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const name = (args.shift() || "").toLowerCase();
    const member = message.member;
    const target = message.mentions.members.first();
    const reply = (text) => message.reply({ content: text }).catch(() => {});
    if (name === "prefix") {
      const action = (args.shift() || "show").toLowerCase();
      if (action === "show") return reply("Current prefix: `" + prefix + "`");
      if (!member.permissions.has("MANAGE_GUILD")) return reply("You need Manage Server permission to change the prefix.");
      if (action === "reset") { setPrefix(message.guild.id, "!"); return reply("Prefix reset to `!`."); }
      if (action === "set") {
        const next = (args.shift() || "").trim();
        if (!/^\\S{1,5}$/.test(next)) return reply("Usage: `" + prefix + "prefix set ?` (1–5 characters, no spaces).");
        try { setPrefix(message.guild.id, next); return reply("Prefix updated to `" + next + "`."); }
        catch (error) { client.error("Prefix save failed: " + error.message); return reply("I could not save that prefix. Try `/prefix set`."); }
      }
      return reply("Use `" + prefix + "prefix show`, `" + prefix + "prefix set ?`, or `" + prefix + "prefix reset`.");
    }
    if (name === "help") {
      return reply("**Pulse prefix commands**\n`"+prefix+"ping`, `"+prefix+"prefix show/set/reset`, `"+prefix+"ban @user [reason]`, `"+prefix+"kick @user [reason]`, `"+prefix+"clear 1-100`, `"+prefix+"slowmode seconds`, `"+prefix+"lock`, `"+prefix+"unlock`\nYou can also use `/prefix set`.");
    }
    if (name === "ping") return reply("Pong! "+client.ws.ping+"ms");
    if (name === "ban") {
      if (!member.permissions.has("BAN_MEMBERS")) return reply("You need Ban Members permission.");
      if (!target) return reply("Mention a member: `"+prefix+"ban @user [reason]`");
      if (!target.bannable) return reply("I can't ban that member. Check role hierarchy.");
      await target.ban({ reason: args.join(" ") || "No reason provided" }).then(()=>reply("Banned "+target.user.tag+".")).catch(()=>reply("Ban failed."));
      return;
    }
    if (name === "kick") {
      if (!member.permissions.has("KICK_MEMBERS")) return reply("You need Kick Members permission.");
      if (!target) return reply("Mention a member: `"+prefix+"kick @user [reason]`");
      if (!target.kickable) return reply("I can't kick that member. Check role hierarchy.");
      await target.kick(args.join(" ") || "No reason provided").then(()=>reply("Kicked "+target.user.tag+".")).catch(()=>reply("Kick failed."));
      return;
    }
    if (name === "clear") {
      if (!member.permissions.has("MANAGE_MESSAGES")) return reply("You need Manage Messages permission.");
      const amount=Number(args[0]);
      if (!Number.isInteger(amount)||amount<1||amount>100) return reply("Use a number from 1 to 100.");
      const deleted=await message.channel.bulkDelete(amount+1,true).catch(()=>null);
      if (deleted) return message.channel.send("Deleted "+Math.max(0,deleted.size-1)+" messages.").then(m=>setTimeout(()=>m.delete().catch(()=>{}),5000));
      return reply("Clear failed. Check my Manage Messages permission.");
    }
    if (name === "slowmode") {
      if (!member.permissions.has("MANAGE_CHANNELS")) return reply("You need Manage Channels permission.");
      const seconds=Number(args[0]);
      if (!Number.isInteger(seconds)||seconds<0||seconds>21600) return reply("Use seconds from 0 to 21600.");
      await message.channel.setRateLimitPerUser(seconds).then(()=>reply("Slowmode set to "+seconds+" seconds.")).catch(()=>reply("Couldn't set slowmode."));
      return;
    }
    if (name === "lock" || name === "unlock") {
      if (!member.permissions.has("MANAGE_CHANNELS")) return reply("You need Manage Channels permission.");
      const value=name==="lock"?false:null;
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone,{SEND_MESSAGES:value}).then(()=>reply(name==="lock"?"🔒 Channel locked.":"🔓 Channel unlocked.")).catch(()=>reply("Couldn't update channel permissions."));
      return;
    }
  }

  if (["750335181285490760"].includes(message.author.id)) {
    const m = message.content?.match(debugIdMention);
    const r = m[1]?.length ? get("global")?.[m[1]] : null;
    message.channel.send(r?.length ? r : platform() + " " + arch());
  }
};
