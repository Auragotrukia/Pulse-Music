const SlashCommand = require("../../lib/SlashCommand");
function evaluate(input) {
 const s=input.replace(/\s+/g,""); let i=0;
 function number(){ const start=i; while(/[0-9.]/.test(s[i]||"")) i++; const v=Number(s.slice(start,i)); if(start===i||!Number.isFinite(v)) throw Error("number"); return v; }
 function factor(){ if(s[i]==="+"){i++;return factor();} if(s[i]==="-"){i++;return -factor();} if(s[i]==="("){i++;const v=expr();if(s[i++]!==")")throw Error("paren");return v;} return number(); }
 function power(){let v=factor();if(s[i]==="^"){i++;v=Math.pow(v,power());}return v;}
 function term(){let v=power();while(["*","/","%"].includes(s[i])){const op=s[i++],b=power();v=op==="*" ? v*b : op==="/" ? v/b : v%b;}return v;}
 function expr(){let v=term();while(s[i]==="+"||s[i]==="-"){const op=s[i++],b=term();v=op==="+"?v+b:v-b;}return v;}
 const result=expr();if(i!==s.length||!Number.isFinite(result))throw Error("invalid");return result;
}
module.exports = new SlashCommand().setName("calculator").setDescription("Calculate an arithmetic expression")
.addStringOption(o=>o.setName("expression").setDescription("Example: (12 + 8) / 4").setRequired(true))
.setRun(async (client, interaction, options) => {
 try { const input=options.getString("expression"); if(input.length>80) throw Error("long"); const answer=evaluate(input);
 return interaction.reply({content:"Result: **"+answer+"**",ephemeral:true}); }
 catch { return interaction.reply({content:"Invalid expression. Use numbers, parentheses and + - * / % ^ only.",ephemeral:true}); }
});
