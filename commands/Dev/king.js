const Discord = require ("discord.js");
const fs = require ("fs");

module.exports = {
  // Execution of the command
  run: (client, botUtils, message, args) => {
    newError = botUtils.newError;

    if (message.author.id! = "375462796697010176") return message.channel.send ("Only the king can use it");

    try {
      let data = require ("../../ dataBank / MindustryRP / index.js");
      let dataJson = {};
      let dataTypes = Object.keys (data);
      //console.log(dataTypes);

      let embedKing = new Discord.MessageEmbed ()
        .setTitle ("MindustryRP json data")
        .setTimestamp ()
        .setColor ("RANDOM");

      for (let dataType in dataTypes) {
        let dataKeys = Object.keys (data [dataTypes [dataType]]);
        embedKing.addField (dataTypes [dataType], dataKeys.join (",") || "no data");

        dataJson [dataTypes [dataType]] = {};
        dataKeys.forEach (dataKey => {
          dataJson [dataTypes [dataType]] [dataKey] = {};

          let dataSubKeys = Object.keys (data [dataTypes [dataType]] [dataKey]);

          dataSubKeys.forEach (dataSubKey => {
            dataJson [dataTypes [dataType]] [dataKey] [dataSubKey] = {
              type: "Number",
              default: 0
            }
          });
        });

        / *
        console.log (`\ n => $ {dataTypes [dataType]}`);
        if (data [dataTypes [dataType]]! = null) {
          console.log (Object.keys (data [dataTypes [dataType]]));
        }
        * /

      };

      message.channel.send (embedKing);

      dataJson = JSON.stringify (dataJson, null, 2);
      fs.writeFileSync ("dataBank / MindustryRP / data.json", dataJson);

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

  // Command configuration
  config: {
    name: "king",
    aliases: [],
    description: "Command that King uses to test things",
    usage: "king",
    accessableby: "@ KingBR # 3793"
  }}