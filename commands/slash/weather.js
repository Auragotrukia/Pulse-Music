const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
module.exports = new SlashCommand().setName("weather").setDescription("Get current weather for a city")
.addStringOption(o=>o.setName("city").setDescription("City name").setRequired(true))
.setRun(async (client, interaction, options) => {
 await interaction.deferReply();
 try {
  const city=options.getString("city");
  const geo=await fetch("https://geocoding-api.open-meteo.com/v1/search?name="+encodeURIComponent(city)+"&count=1&language=en&format=json").then(r=>r.json());
  if(!geo.results||!geo.results.length) return interaction.editReply("I couldn't find that city.");
  const p=geo.results[0];
  const data=await fetch("https://api.open-meteo.com/v1/forecast?latitude="+p.latitude+"&longitude="+p.longitude+"&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto").then(r=>r.json());
  const c=data.current; const labels={0:"Clear sky",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"Rime fog",51:"Light drizzle",53:"Drizzle",55:"Heavy drizzle",61:"Light rain",63:"Rain",65:"Heavy rain",71:"Light snow",73:"Snow",75:"Heavy snow",80:"Rain showers",81:"Heavy showers",82:"Violent showers",95:"Thunderstorm",96:"Thunderstorm with hail",99:"Heavy thunderstorm"};
  const e=new MessageEmbed().setColor(client.config.embedColor).setTitle("Weather — "+p.name+", "+(p.country||"")).setDescription(labels[c.weather_code]||"Current conditions")
  .addFields({name:"Temperature",value:c.temperature_2m+"°C",inline:true},{name:"Feels like",value:c.apparent_temperature+"°C",inline:true},{name:"Humidity",value:c.relative_humidity_2m+"%",inline:true},{name:"Wind",value:c.wind_speed_10m+" km/h",inline:true},{name:"Precipitation",value:c.precipitation+" mm",inline:true}).setFooter({text:"Source: Open-Meteo"});
  return interaction.editReply({embeds:[e]});
 } catch(e) { return interaction.editReply("Weather lookup failed. Please try again shortly."); }
});
