const Discord = require ("discord.js");
const {Users} = require ("../../ database.js");

module.exports = {
  run: async (client, botUtils, message, args) => {
    newError = botUtils.newError;

    try {
    let user = message.mentions.members.first () || client.guilds.cache.get ("699823229354639471"). members.cache.get (args [0]) || message.member;
      Users.findById (user.id, (err, doc) => {
        if (err) {
          let embed = new Discord.MessageEmbed ()
            .setTitle ("Unexpected error")
            .setDescription ("An unexpected error has occurred. please contact the ADMs \n \nA log was created with more information about the error");
          message.channel.send (embed);

          let IDs = {
            server: message.guild.id,
            user: message.author.id,
            msg: message.id
          }
          console.log (`=> $ {newError (err, module.exports.config.name, IDs)}`);
          return;
        }

        if (! doc) {
          let newUser = new Users ({
            _id: user.id
          });
          newUser.save ();
          message.channel.send ("Try again!");
          return;
        }

        try {
          let embedBal = new Discord.MessageEmbed ()
            .setColor ("RANDOM")
            .setTimestamp ()
            .setTitle (`$ {user.displayName || user.tag}` wallet)
            .setDescription (`$ {doc.money}`);
          message.channel.send (embedBal);
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
          console.log (`=> $ {newError (err, module.exports.config.name, IDs)}`);
          return;
        }
        return;
      });
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
      console.log (`=> $ {newError (err, module.exports.config.name, IDs)}`);
      return;
    }
  },

  config: {
    name: "balance",
    noalias: "Money, Money, Wallet",
    aliases: ['money', 'money', 'wallet', 'bufunfa', 'b'],
    description: "See how much money you have",
    usage: "balance",
    accessableby: "Members"
  }
}