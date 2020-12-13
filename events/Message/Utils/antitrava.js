const Discord = require ("discord.js");

module.exports = (client, botUtils, message) => {

   let canal = client.channels.cache.get ("767982805908324411");
   let travas = botUtils.jsonPull ("./ dataBank / travas.json");

   locks.forEach (locks => {
     if (message.content.includes (crash)) {
       message.delete (). catch (() => {});
       message.member.ban ("Suspected disc lock"). catch (() => {});

       let embed = new Discord.MessageEmbed ()
         .setTitle ("SUSPECTED LOCK DISCORD")
         .setColor ("RED")
         .setTimestamp ()
         .setDescription (`$ {message.author} / $ {message.author.tag} / ID: $ {message.author.id}`)
         .addField ("Suspicious message content", `$ {message.content.slice (0, 100)} ...`)
         .addField ("Suspected string", crashes);
       if (channel) canal.send (embed);
       return;
     }
   })
}