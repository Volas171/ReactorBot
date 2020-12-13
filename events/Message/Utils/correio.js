const Discord = require ("discord.js");

module.exports = (client, botUtils, message, args) => {
   newError = botUtils.newError;
   try {
     let messageArray = message.content.split (/ + /);
let cmd = messageArray [0] .toLowerCase ();
let args = messageArray.slice (1);

     // If the author of the message is a bot, he ignores
    if (message.author.bot) return;
    if (cmd! = "! mail") return;
     console.log (message.content)

// if (! message.content.startsWith (prefix)) return;


     // sla
     message.channel.send (`" $ {cmd} "\ n \ n-said the bitch`);

   } catch (err) {
     let IDs = {
       user: message.author.id,
       msg: message.id
     };
     console.log (`=> $ {newError (err," ClientCorreio ", IDs)}`);
   }
}