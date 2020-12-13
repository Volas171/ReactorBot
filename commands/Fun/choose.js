const Discord = require ("discord.js");

module.exports = {
  // Execution of the command
  run: (client, botUtils, message, args) => {
    newError = botUtils.newError;

    try {
      // Command code
      if (! args [0]) return message.reply ('I need choices');

      const phrases = args.join ('') .split ('/')

      let choice = phrases [Math.floor (Math.random () * phrases.length)]
      let nome = message.author.tag

      let embed = new Discord.MessageEmbed ()
        .setTitle ("Choose")
        .setDescription ("I choose ...` "+ choose +" `!")
        .setFooter ("Requested by" + name)
        .setColor ("RANDOM")
      message.channel.send (embed)


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
      console.log (`=> $ {newError (err," choose ", IDs)}`);
    }
  },

  // Command configuration
  config: {
    name: "choose",
    aliases: ['c'],
    description: "take a random phrase (separated by /)",
    usage: "choose <frase1> [/ phrase2] [/ phrase3] ...",
    accessableby: "Membross"
  }
}