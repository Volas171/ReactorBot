const fs = require ("fs");
const Discord = require ("discord.js");

var self = this

module.exports = {
   run: async (client, botUtils, message, args) => {
     newError = botUtils.newError;

     try {
       // dps strip
       message.reply ('not yet implemented')

     } catch (err) {
       let embed = new Discord.MessageEmbed ()
         .setTitle ("Unexpected error")
         .setDescription ("An unexpected error has occurred. please contact the ADMs \ n \ nA log was created with more information about the error");
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
     name: "fish",
     noalias: "no nicknames",
     aliases: [],
     description: "Catch a fish to sell later",
     usage: "fish",
     accessableby: "Members"
   }
}