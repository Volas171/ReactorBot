const Discord = require("discord.js");

module.exports = async ({ client, botUtils }, member) => {
  newError = botUtils.newError;

  if(member.guild.id != "699823229354639471") return;

  try {
    let welcome = new Discord.MessageEmbed()
      .setTitle("Bem vindo!")
      .setDescription(`${member.user} (${member.user.tag}), obrigado por entrar em nosso servidor!`)
      .setColor("RANDOM")
    client.channels.cache.get("699823229354639474").send(welcome);
  } catch (err) {
    let IDs = {
      server: member.guild.id,
      user: member.user.id
    }
    console.log(`=> ${newError(err, "guildMemberAdd", IDs)}`);
  }
}