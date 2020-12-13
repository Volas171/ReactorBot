const Discord = require ("discord.js");

module.exports = {
  run: async (client, botUtils, message, args) => {

    try {

      if (args [0] == 'help') return message.channel.send ({embed: {description: '"description": <text> \n "" "'}});

      let msg = /`{3,}(.+)`{3,}/i.exec(message.content)

      let jotafilho;
      if (msg) {
        try {
          jotafilho = JSON.parse (msg [1])
        } catch (err1) {
          message.reply ("Your message could not be understood")
        }
      } else {

        return message.reply ("you need a text in this format \` \ `\` <text> \ `\` \ `")

      }

      if (jotafilho) message.channel.send ({embed: jotafilho})
    } catch (err) {
      let embed = new Discord.MessageEmbed ()
        .setTitle ("Unexpected error")
        .setDescription ("An unexpected error has occurred. please contact the ADMs \n \nA log was created with more information about the error");
      message.channel.send (embed);

      let IDs = {
        server: message.guild.id,
        user: message.author.id,
        msg: message.id
      }
      console.log (`=> $ {newError (err," fifteen ", IDs)}`);
    }
  },

  config: {
    name: "embed",
    noalias: "No synonyms",
    aliases: [],
    description: "Send an embed message",
    usage: "embed <message>",
    accessableby: "Member"
  }

}