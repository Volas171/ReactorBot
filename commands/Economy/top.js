const fs = require ("fs");
const Discord = require ("discord.js");
const {Users} = require ("../../ database.js");

module.exports = {
  run: async (client, botUtils, message, args) => {
    newError = botUtils.newError;

    try {
      // the help
      if (! args [0] || args [0] .toLowerCase () == "help") return message.channel.send ({embed: {
        title: "Top help",
        description: "** top money: ** Shows the money score \n ** top lvl: ** Shows the level score \n"
      }})

      //
      let sort = (a, b) => {
        return (args [0] && args [0] .toLowerCase () == "lvl")? b.levelSystem.txp - a.levelSystem.txp: b.money - a.money;
      }

      await Users.find ({}, (err, doc) => {
        if (err) {
          console.log (err);
          return;
        }

        doc = doc.sort (sort);

          // starting variables
          let pos = 0;
          let last = [0, Number.MAX_VALUE]
          let finded = false;
          let msg = '';
          let guild = client.guilds.cache.get ('699823229354639471');
          let membId = message.mentions.members.first () || guild.members.cache.get (args [0]) || message.member;
          membId = membId.id;

          // Adding to the list
          doc.forEach (user => {
            pos ++;
            let val = (args [0] && args [0] .toLowerCase () == 'lvl')? user.levelSystem.level: user.money;
            if (last [1]> val) {
              last = [pos, val];
            }

            if (pos <= 10 || user._id == membId) {

              if (pos> 11) msg ​​+ = '... \n';
              if (user._id == membId) finded = true;

              let name = guild.members.cache.get (user._id)? guild.members.cache.get (user._id) .displayName: "Unknown user";

              if (! guild.members.cache.get (user._id)) {
                message.channel.send (user._id);
              }

              msg + = '**' + last [0] + '. **'
              msg + = user._id == membId? `** $ {name} **`: name
              msg + = ': **' + val + '** \n'
            }
          });

          // If player n is on the list
          if (! finded) {
            if (last [1]> 0) last [0] ++;

            msg + = `... \ n ** $ {last [0]}. ** ** $ {guild.members.cache.get (membId) .displayName} **: ** 0 **`
          }

          // sending list
          let title = "Money";
          if (args [0] && args [0] .toLowerCase () == "lvl") title = "Level";

          let embed = new Discord.MessageEmbed ()
            .setTitle ("Top" + title)
            .setColor ("RANDOM")
            .setDescription (msg)
            .setFooter ((last [1] == 0? last [0] -1: last [0]) + 'members'); // n counting members with 0 from money
          message.channel.send (embed)

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
    }
  },

  config: {
    name: "top",
    noalias: "No synonyms",
    aliases: [],
    description: "See who has the most money",
    usage: "top",
    accessableby: "Members"
  }
}