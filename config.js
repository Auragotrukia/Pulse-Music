const env = process.env;
module.exports = {
  helpCmdPerPage: 10, lyricsMaxResults: 5,
  adminId: env.ADMIN_ID || env.adminId || "UserId",
  token: env.DISCORD_TOKEN || env.token || "",
  clientId: env.APPLICATION_ID || env.CLIENT_ID || env.clientId || "",
  clientSecret: env.CLIENT_SECRET || env.clientSecret || "",
  port: Number(env.PORT || 4200), scopes: ["identify", "guilds", "applications.commands"],
  inviteScopes: ["bot", "applications.commands"], serverDeafen: true, defaultVolume: 100,
  supportServer: "", Issues: "https://github.com/Auragotrukia/Pulse-Music/issues",
  permissions: 277083450689, disconnectTime: 30000, twentyFourSeven: false,
  autoQueue: false, autoPause: true, autoLeave: false, debug: env.DEBUG === "true",
  cookieSecret: env.COOKIE_SECRET || "change-this-cookie-secret", website: env.WEBSITE_URL || "",
  nodes: [{ identifier: "Render Lavalink", host: env.LAVALINK_HOST || "localhost",
    port: Number(env.LAVALINK_PORT || 2333), password: env.LAVALINK_PASSWORD || "youshallnotpass",
    retryAmount: 20, retryDelay: 3000, secure: env.LAVALINK_SECURE === "true" }],
  embedColor: "#5865F2",
  presence: { status: "online", activities: [{ name: "music + utilities", type: "LISTENING" }] },
  iconURL: ""
};
