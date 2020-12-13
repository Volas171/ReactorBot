const Discord = require ("discord.js");

module.exports = ({client, botUtils}, member) => {
  newError = botUtils.newError;

  try {

    const timeProp = [1, 1000, 60000, 3600000, 86400000, 31536000000, Number.POSITIVE_INFINITY];
    const timename = ["ms", "second", "minute", "hour", "day", "year", "??? Eternity"];

    let emoji = client.emojis.cache.find (e => e.name == "PaimonPat" && e.animated);
    let time = ((new Date (). getTime ()) - member.joinedTimestamp);
    let description = "";

    timeProp.some ((t, i) => {

      const times = (i) => timeProp [i];

      if (times (i + 1)> time) {

        const getTxt = (time, i) => {
          let res = Math.floor (time / times (i));
          return `$ {res} $ {timename [i]} $ {res == 1? "": "s"} `;
        }

        if (time <timeProp [2]) {
          description = "\nStay on the server for only";
        } else if (time <timeProp [4] * 7) {
          description = "\nYou held the server for";
        } else if (time <timeProp [4] * 30) {
          description = "\nThis was a warrior. He stayed on the server for"
        } else if (time <timeProp [4] * 30 * 6) {
          description = "\nI bet this was quite important on the server.
        } else {
          description = "\nThank you for being a server for so long, even. Stayed on the server for"
        }

        let t1 = Math.floor (time / times (i));
        let t2 = Math.floor (time% times (i) / times (i-1));

        description + = `$ {t1} $ {timename [i]} $ {t1 == 1? "": "s"} and $ {t2} $ {timename [i-1]} $ {i == 1 || t2 == 1? "": "s"} `;

        return true;
      }
      return false;
    });

    let welcome = new Discord.MessageEmbed ()
      .setTitle (`$ {emoji} See you soon!`)
      .setDescription (`$ {member} ($ {member.user.tag}), left our server!` + description)
      .setColor ("RANDOM")
      .setTimestamp ()
      .setThumbnail (member.user.displayAvatarURL ({format: "png", dynamic: true, size: 512}))
    //.setImage("https://thumbs.gfycat.com/BrownFavoriteCock-small.gif ");
    client.channels.cache.get ("699823229354639474"). send (welcome);

  } catch (err) {
    console.log (`=> $ {newError (err," guildMemberRemove ")}`);
  }
}