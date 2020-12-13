const Discord = require ("discord.js");

module.exports = (client, botUtils, message) => {
  newError = botUtils.newError;
  try {

    if (botUtils.isDev (message.author.id)) return;

    let msg = message.content.replace (/<.+?>/ g, 'M')
    let size = msg.length
    let spaces = msg.match (/ \ s / g)
    spaces = spaces && spaces.length / size || 0
    let mentions = message.content.match (/<.+?>/ g)
    mentions = mentions && mentions.length || 0

    // number of urls
    let urls = msg.match (/ (? :( ?: https? | ftp | file): \ / \ / | www \. | ftp \.) (?: \ ([- A-Z0-9 + & @ # \ /% = ~ _ | $?!:,.] * \) | [-A-Z0-9 + & @ # \ /% = ~ _ | $?!:,.]) * (?: \ ([-A-Z0-9 + & @ # \ /% = ~ _ | $?!:,.] * \) | [A-Z0-9 + & @ # \ /% = ~ _ | $]) / igm)
    urls = urls && urls.length || 0

    if (size <20 &&! mentions) return;
    if (msg.startsWith ('! bet')) return;
    if (

      (size> = 50 &&! urls && spaces <0.05) ||
      (urls> 1) ||
      (mentions> 3)

    ) {
      const cLogs = client.channels.cache.get ('767982805908324411');
      message.react ('755634481771184229')
      return cLogs.send ({embed: {
        title: "Possible SPAM",
        author: {
          name: message.author.tag,
icon_url: message.author.avatarURL ()
        },
        description: message.content,
        fields: [{name: "channel", value: message.channel}, {name: "message", value: `https: //discordapp.com/channels/699823229354639471/$ {message.channel.id} / $ { message.id} `}]
      }});
      message.reply ('your message has been detected as spam.')
    };

  } catch (err) {
    let IDs = {
      server: message.guild.id,
      user: message.author.id,
      msg: message.id
    }
    console.log (`=> $ {newError (err," ClientMessage_Mudae ", IDs)}`);
  }
}