const Discord = require ("discord.js");

module.exports = (client, botUtils, message) => {
   newError = botUtils.newError;
   try {
     if ((message.content.match (/ \ n / g) || []). length <3) {
       let emb = new Discord.MessageEmbed ()
         .setColor ('RANDOM')
         .setAuthor (message.author.tag, message.author.displayAvatarURL ())
         .setTitle ('Message in #mudae-commerce!')
         .setDescription (message)
         .setThumbnail (message.author.displayAvatarURL ({dynamic: true, format: "png", size: 1024}))
         .setTimestamp ();
       message.delete ({reason: "Message on the wrong channel"});
       client.channels.cache.get ("767982805908324411"). send (emb);
     }

   } catch (err) {
     let IDs = {
       server: message.guild.id,
       user: message.author.id,
       msg: message.id
     }
     console.log (`=> $ {newError (err," ClientMessage_Mudae ", IDs)}`);
   }
}