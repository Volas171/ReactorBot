const fs = require ("fs");
const Discord = require ("discord.js");

module.exports = {
  run: async (client, botUtils, message, args) => {

    if (message.author.id == "318399612060696576") message.channel.send ("if you crash you get ban");

    newError = botUtils.newError;
    isDir = botUtils.isDir;

    try {

      let t1 = (args [0] || 'bed'). split ('');
      let t2 = (args [1] || 'box'). split ('');
      let start = new Date (). getTime ()



      message.channel.send (botUtils.arrDiference (t1, t2) .join ('\n'))
      message.channel.send ((new Date (). getTime () - start) / 1000 + 's')
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
      console.log (`=> $ {newError (err," poly ", IDs)}`);
    }
  },

  config: {
    name: "diff",
    aliases: [],
    description: "Get the difference between 2 arrays",
    usage: "diff <arr1> / <arr2>",
    accessableby: "Member"
  }}