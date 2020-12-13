const Discord = require ("discord.js");
const {Users} = require ("../../ database.js");

module.exports = {
  // Execution of the command
  run: (client, botUtils, message, args) => {
    newError = botUtils.newError;

    // if (! botUtils.isDev (message.author.id) &&! botUtils.isTester (message.author.id)) return message.channel.send ("Command in maintenance")

    try {
      if (! args [0]) args [0] = 5;
      if (isNaN (args [0]) ||! Number.isInteger (Number (args [0]))) return message.channel.send ("invalid number");
      if (args [0] <3) return message.channel.send ("Minimum quantity: 3");
      if (args [0]> 11) return message.channel.send ("Maximum quantity: 11");

      let reward = {
        money: Math.floor ((Math.pow (2, args [0]) - 1) / 2) + Math.floor ((Math.pow (2, args [0]) - 1) / 10),
        xp: Math.floor ((Math.pow (2, args [0]) - 1) / 3) * 2 + Math.floor ((Math.pow (2, args [0]) - 1) / 4)
      }

      //message.channel.send(JSON.stringify(recompensa, null, 2));

      let pieces = {
        "0": "\ u200b",
        "1": "<: blank: 780544005229641750> 1⃣",
        "2": "<: blank: 780544005229641750> 2⃣",
        "3": "<: blank: 780544005229641750> 3⃣",
        "4": "<: blank: 780544005229641750> 4⃣",
        "5": "<: blank: 780544005229641750> 5⃣",
        "6": "<: blank: 780544005229641750> 6⃣",
        "7": "<: blank: 780544005229641750> 7⃣",
        "8": "<: blank: 780544005229641750> 8⃣",
        "9": "<: blank: 780544005229641750> 9⃣",
        "10": "<: blank: 780544005229641750> 🔟",
        "11": "<: blank: 780544005229641750> ⏸️"
      }

      let tower = {
        "0": "A",
        "1": "B",
        "2": "C"
      }

      var hanoi = [[], [], []];

      for (let i = 0; i <args [0]; i ++) {
        hanoi [0] [i] = i + 1;
        hanoi [1] [i] = 0;
        hanoi [2] [i] = 0;
      }

      let minMoves = Math.pow (2, args [0]) - 1;
      let quantMoves = 0;
      let startTime = new Date (). getTime ();

      let embed = new Discord.MessageEmbed ()
        .setTitle ("Towers of Hanoi")
        .setDescription (`Minimum amount of movements: $ {minMoves}`)
        .setColor ("RANDOM")
        .setTimestamp (startTime);

      for (i = 0; i <hanoi.length; i ++) {
        let str = "";
        for (let j = 0; j <args [0]; j ++) {
          str + = pieces [hanoi [i] [j]] + "\n";
        }
        embed.addField (`Tower $ {tower [i]}`, `$ {str}`, true);
      }

      message.channel.send (embed) .then (async msg => {
        await msg.react ("🇦");
        await msg.react ("🇧");
        await msg.react ("🇨");

        let filter = (r, u) => ((r.emoji.name == "🇦" || r.emoji.name == "🇧" || r.emoji.name == "🇨") && u. id == message.author.id);

        var collector = msg.createReactionCollector (filter, {idle: 120000});

        let moveFrom = null;
        collector.on ("collect", (r, u) => {
          msg.reactions.cache.find (re => re.emoji.name == r.emoji.name) .users.remove (message.author);

          if (moveFrom == null) {
            switch (r.emoji.name) {
              case "🇦": {
                moveFrom = 0;
                break;
              }
              case "🇧": {
                moveFrom = 1;
                break;
              }
              case "🇨": {
                moveFrom = 2;
                break;
              }
            }

            let embed2 = new Discord.MessageEmbed ()
              .setTitle ("Towers of Hanoi")
              .setDescription (`Minimum number of movements: $ {minMoves} \ n \ nMovements: $ {quantMoves}`)
              .setColor ("RANDOM")
              .setTimestamp (startTime);

            for (i = 0; i <hanoi.length; i ++) {
              let move = "";
              if (moveFrom == i) move = "<=";
              let str = "";
              for (let j = 0; j <args [0]; j ++) {
                str + = pieces [hanoi [i] [j]] + "\n";
              }
              embed2.addField (`Tower $ {tower [i]} $ {move}`, `$ {str}`, true);
            }

            msg.edit (embed2);

          } else {
            let pieceChosed = hanoi [moveFrom] .filter (e => e! = 0) [0];
            switch (r.emoji.name) {
              case "🇦": {
                if (moveFrom == 0) break;

                let moveTo = hanoi [0] .filter (e => e == 0) .length - 1

                if (hanoi [moveFrom] .indexOf (pieceChosed)! = -1) {
                  if (hanoi [0] [moveTo + 1] == null || hanoi [moveFrom] [hanoi [moveFrom] .indexOf (pieceChosed)] <hanoi [0] [moveTo + 1]) {
                    hanoi [0] [moveTo] = pieceChosed;
                    hanoi [moveFrom] [hanoi [moveFrom] .indexOf (pieceChosed)] = 0;
                    quantMoves ++;
                  }
                }
                break;
              }
              case "🇧": {
                if (moveFrom == 1) break;

                let moveTo = hanoi [1] .filter (e => e == 0) .length - 1

                if (hanoi [moveFrom] .indexOf (pieceChosed)! = -1) {
                  if (hanoi [1] [moveTo + 1] == null || hanoi [moveFrom] [hanoi [moveFrom] .indexOf (pieceChosed)] <hanoi [1] [moveTo + 1]) {
                    Hanoi[1] [moveTo] = pieceChosed;
                    hanoi [moveFrom] [hanoi [moveFrom] .indexOf (pieceChosed)] = 0;
                    quantMoves ++;
                  }
                }
                break;
              }
              case "🇨": {
                if (moveFrom == 2) break;

                let moveTo = hanoi [2] .filter (e => e == 0) .length - 1

                if (hanoi [moveFrom] .indexOf (pieceChosed)! = -1) {
                  if (hanoi [2] [moveTo + 1] == null || hanoi [moveFrom] [hanoi [moveFrom] .indexOf (pieceChosed)] <hanoi [2] [moveTo + 1]) {
                    hanoi [2] [moveTo] = pieceChosed;
                    hanoi [moveFrom] [hanoi [moveFrom] .indexOf (pieceChosed)] = 0;
                    quantMoves ++;
                  }
                }
                break;
              }
            }
            moveFrom = null;

            if (! hanoi [2] .includes (0)) {
              collector.stop ();

            } else {
              let embed2 = new Discord.MessageEmbed ()
                .setTitle ("Towers of Hanoi")
                .setDescription (`Minimum number of movements: $ {minMoves} \ n \ nMovements: $ {quantMoves}`)
                .setColor ("RANDOM")
                .setTimestamp (startTime);

              for (i = 0; i <hanoi.length; i ++) {
                let str = "";
                for (let j = 0; j <args [0]; j ++) {
                  str + = pieces [hanoi [i] [j]] + "\n";
                }
                embed2.addField (`Tower $ {tower [i]}`, `$ {str}`, true);
              }

              msg.edit (embed2);
            }
          }
        });

        collector.on ("end", () => {
          msg.reactions.removeAll ();

          if (hanoi [2] .includes (0)) return;

          // || hanoi [2]! = solved || hanoi [0] .filter (e => e == 0) .length! = hanoi [0] .length || hanoi [1] .filter (e => e == 0) .length! = hanoi [1] .length || hanoi [2] .filter (e => e == 0)! = 0

          let endTime = new Date (). getTime () - startTime;

          Users.findById (message.author.id, (err, doc) => {
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

            if (! doc) doc = new Users ({_id: message.author.id});

            if (quantMoves! = minMoves) {
              reward = {
                money: Math.ceil (reward.money * Math.pow (2, (minMoves - quantMoves) / minMoves)),
                xp: Math.ceil (reward.xp * Math.pow (2, (minMoves - quantMoves) / minMoves))
              }

              if (reward.money <1) reward.money = 0;
              if (reward.xp <1) reward.xp = 0;
            }

            doc.money + = reward.money;
            doc.levelSystem.txp + = reward.xp;
            doc.levelSystem.xp + = reward.xp;

            doc.save ();

            let embed3 = new Discord.MessageEmbed ()
              .setTitle ("Towers of Hanoi")
              .setDescription (`Minimum number of movements: $ {minMoves} \ n \ nMovements: \` $ {quantMoves} \ `\ nSolved in: \` $ {Math.floor (endTime / 60000)}: $ {Math.floor ( endTime / 1000% 60) .toString (). padStart (2, '0')} \ `\ n \ n ** Rewards: ** \ n $$ {reward.money} \ n $ {reward.xp} xp `)
              .setColor ("RANDOM")
              .setTimestamp ();

            for (i = 0; i <hanoi.length; i ++) {
              let str = "";
              for (let j = 0; j <args [0]; j ++) {
                str + = pieces [hanoi [i] [j]] + "\n";
              }
              embed3.addField (`Tower $ {tower [i]}`, `$ {str}`, true);
            }

            msg.edit (embed3);
          });
        });
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
    name: "hanoi",
    aliases: ["hanoitower"],
    description: "Try to solve the Hanoi Towers puzzle",
    usage: "hanoi [number of pieces]",
    accessableby: "Members"
  }
}