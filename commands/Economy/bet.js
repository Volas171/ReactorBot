const fs = require ('fs');
const Discord = require ('discord.js');
const {Users} = require ("../../ database.js");

module.exports = {
  run: async (client, botUtils, message, args) => {
    newError = botUtils.newError;

    try {
      // return message.reply ('still in progress ...');
      let money = parseInt (args.pop ());

      if (isNaN (money) || money <1) return message.reply ('Choose a positive number, other than zero to bet')

      let belters = []
      const win = (channel, winner, belters, amount) => {

        channel.send ({embed: {title: "The Winner was ...", description: "--- [3] ---"}}). then (msg => {
          const wait = (step) => {
            botUtils.sleep (2000) .then (() => {
              if (step> 0) {
                step--;
                msg.edit ({embed: {title: "The Winner was ...", description: `$ {'-'. repeat (step)} $ {'='. repeat (3 - step)} [$ {step }] $ {'='. repeat (3 - step)} $ {'-'. repeat (step)} `}})
                wait (step)
              } else {
                let changes = []

                belters.forEach (u => {
                  Users.findById (u, (errDB, doc) => {
                    if (errDB) {
                      console.log (`=> $ {newError (errDB," bet ")}`);
                      return;
                    }

                    try {

                      let oriMoney = doc.money;
                      doc.money + = amount * (u == winner? belters.length - 1: -1);
                      changes.push (`$ {client.users.cache.get (u) .tag} ($ {oriMoney} $ => $ {doc.money} $)`);

                      doc.levelSystem.xp + = 5;
                      doc.levelSystem.txp + = 5;
                      doc.save ();

                      if (changes.length == belters.length)
                        msg.edit ({embed: {title: "The Winner was ...", description: `$ {amount} $ from all players has already been transferred to $ {client.users.cache.get (winner) .tag} \ n \ n $ {changes.join ('\ n')} `}})
                    } catch (err) {
                      console.log (`=> $ {newError (err," bet ")}`);
                    }
                  });
                })
              }
            })
          }
          wait (3)
        })
      }

      if (args [0] == '* asdfasdfxca342343er3245 vfeafae') {

        let embed = new Discord.MessageEmbed ()
          .setTitle (`Betting $ {money}`)
          .setDescription ('react with ✅ to participate');

      } else {

        let outmoney = []

        belters = message.mentions.members.filter (u =>! u.user.bot) .array ()
        belters.push (message.member)
        belters = belters.filter ((u1, i) => i == belters.findIndex (u2 => u1.id == u2.id))
        belters = belters.map (u => u.id)

        let moneyVerify = []

        belters.forEach (u => {
          Users.findById (u, (errDB, doc) => {
            if (errDB) {
              console.log (`=> $ {newError (errDB," bet ")}`);
              return;
            } try {

              if (! doc || doc.money <money) outmoney.push (u)
              moneyVerify.push (u)

              if (moneyVerify.length == belters.length) {

                if (outmoney.length) {

                  message.reply ('The following participants do not have enough money: \n' + outmoney.map (id => client.users.cache.get (id) .tag) .join ('\ n'))

                } else if (belters.length == 1) {

                  message.reply ('You need to book someone to bet, or type `*` to bet with everyone')

                } else {

                  let embed = new Discord.MessageEmbed ()
                    .setTitle (`Betting $ {money} $`)
                    .setDescription ('I need participants to bookmark ✅ to participate. \n' + belters.map (id => client.users.cache.get (id) .tag) .join ('\ n'));
                  message.channel.send (embed) .then (msg => {
                    msg.react ('✅')

                    let accepted = []
                    var filter = (reaction, user) => '✅' == reaction.emoji.name && belters.indexOf (user.id)> = 0 &&! user.bot;
                    var collector = msg.createReactionCollector (filter, {time: 60000});

                    collector.on ("collect", (r, u) => {
                      if (! accepted.includes (u.id)) {
                        accepted.push (u.id)

                        msg.edit ({embed: {title: `Betting $ {money} $`, description: 'I need participants to mark ✅ to participate. \ n' + belters.map (id => (accepted.includes (id)? '✅': '') + client.users.cache.get (id) .tag) .join ('\ n')}})

                        if (accepted.length == belters.length) {
                          collector.stop ()
                        }
                      }
                    })

                    collector.on ("end", collected => {
                      msg.reactions.removeAll ()
                      if (belters.some (u =>! accepted.includes (u))) {
                        msg.edit ({embed: {title: `Bet from
$ {money} $ Finished`, description: "Members are missing: \n" + belters.filter (b =>! accepted.includes (b)). map (id => client.users.cache.get ( id) .tag) .join ('\n')}})
                      } else {

                        let numb = Math.random () * belters.length
                        //console.log('['+belters.join(',')+'▪:'+numb)
                        let winId = belters [Math.floor (numb)]
                        win (msg.channel, winId, belters, money)

                      }
                    });
                  });

                }
              }

            } catch (err) {
              console.log (`=> $ {newError (err," bet ")}`);
            }
          })
        })

      }

    } catch (err) {
      let embed = new Discord.MessageEmbed ()
        .setTitle ('Unexpected error')
        .setDescription (
          'An unexpected error has happened. please contact the ADMs \n \nA log was created with more information about the error '
        );
      message.channel.send (embed);

      let IDs = {
        server: message.guild.id,
        user: message.author.id,
        msg: message.id
      };
      console.log (`=> $ {newError (err, module.exports.config.name, IDs)}`);
    }
  },

  config: {
    name: 'bet',
    aliases: [],
    description: 'Bet an amount with someone or msm with several people',
    usage: 'bet <value> <member1 / all> [member2] [member3] ...',
    accessableby: 'Members'
  }
};