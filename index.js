require("dotenv").config();
const http = require("http");
const DiscordMusicBot = require("./lib/DiscordMusicBot");
const client = new DiscordMusicBot();
const port = Number(process.env.PORT || 10000);
http.createServer((req, res) => {
  if (req.url === "/health" || req.url === "/") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify({ ok: true, service: "Pulse Music", bot: client.isReady() }));
  }
  res.writeHead(404); res.end("Not found");
}).listen(port, "0.0.0.0", () => console.log("Health endpoint listening on " + port));
module.exports = { getClient: () => client };
