const Discord = require ("discord.js");

module.exports = {
  // Execution of the command
  run: (client, botUtils, message, args) => {
    newError = botUtils.newError;

    try {
      // Command code
      if (message.channel.id! = "729230699416125440") return message.reply ("don't spoil my surprise: P \nuse the test-bot");


      const funcs = [
        function () {
          const words = botUtils.jsonPull ('./ dataBank / textSaves.json'). quizWords;
          const resp = words [Math.floor (Math.random () * words.length)];
          const quant = Math.floor ((1-Math.log10 (1 - Math.random ())) * resp.length / 4);

          const mutate = (str) => {

            let op = Math.floor (Math.random () * 3)
            let letter = Math.floor (Math.random () * 26 + 10) .toString (36)
            let arr = quest.split ("");

            if (op == 0) {
              arr.splice (Math.random () * arr.length, 1, letter);
            } else if (op == 1) {
              arr.splice (Math.random () * arr.length, 0, letter);
            } else if (op == 2) {
              arr.splice (Math.random () * arr.length, 1);
            }

            return arr.join ("");
          }

          let quest = resp

          for (let i = 0; i <quant; i ++) {quest = mutate (quest)}

          quest = `There was an error in the file ($ {quant} x), find the word: \` $ {quest} \ ``

          return [quest, resp.toLowerCase ()];
        }
      ]

      let times = parseInt (args [0])
      times = (! isNaN (times) && times> 0)? times: 1

      for (let i = 0; i <times; i ++) {
        const quest = funcs [0] ()

        message.channel.send ('>' + quest [0])
        message.channel.send ("||" + quest [1] + "||")
      }

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
    name: "miniquiz",
    noalias: "No synonyms",
    aliases: [],
    description: "description",
    usage: "miniquiz",
    accessableby: "Developers"
  }}