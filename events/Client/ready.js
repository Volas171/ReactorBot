module.exports = ({client, botUtils}) => {
  newError = botUtils.newError;
  try {
    const guild = client.guilds.cache.get ("699823229354639471");

    // console log
    console.log (`\ nBot was logged as $ {client.user.tag}`)
    console.log ("Started at" + botUtils.formatDate (new Date ()));

    // Time the bot took to start
    botUtils.jsonChange ('./ dataBank / serverState.json', server => {

      const dTime = (new Date ()). getTime () - server.serverStarted - 10800000
      console.log (`It took $ {Math.floor (dTime / 60000)}: $ {(Math.floor (dTime / 1000)% 60) .toString (). padStart (2, '0')} to start \ n `);

    }, true);

    // Reactor reaction
    require ('./ utils / reactionRole') (client, botUtils, guild)
    // Delete proposals
    require ('./ utils / deleteProp') (client, botUtils, guild)

    // bot activity
    client.user.setActivity ("! help for the command list", {type: "WATCHING"});


    // Times
    client.setInterval (async () => {
      const d = new Date ();
      require ("./ utils / updatePlacar.js") (client, botUtils);

      // check if the mute time is up
      botUtils.jsonChange ('./ dataBank / mutedlist.json', muted => {
        for (let userid in muted) {
          if (Math.sign (muted [userid] [0]) * (d.getTime () - muted [userid] [0])> 0) {
            delete muted [userid];
            const user = client.users.cache.get (userid);
            user.send (`You have been removed from the server $ {guild}`);
            guild.member (user) .roles.remove (guild.roles.cache.get ("755665930159390721"), 'The mute duration has already been completed');
            console.log (`the $ {user.tag} ($ {user}) has been demoted.`);
          }
        }
        return muted;
      });


      // check if it is already time for the event
      botUtils.jsonChange ('./ dataBank / serverState.json', server => {

        const editing = false;
        const guild = client.guilds.cache.get ("699823229354639471");

        // if the next mini quiz has arrived
        if (server.nextMiniquiz <d.getTime ()) {

          // get the responses and the type of the event
          const ret = require ("./ utils / minievents.js") (client, botUtils, server);
          if (ret) {
          server.eventType = ret [1];
          server.eventWin = ret [0];

          server.nextMiniquiz = d.getTime () + Math.floor ((Math.random () + 1) * 20 * 60 * 1000);
          } else {console.log (`=> $ {newError (new Error (" No value was returned to place in the mini-quiz ")," ClientReady_MiniquizReturn ")}`);}
        }

        // Message of the day / 24h interval
        if (server.nextMsgOfDay <d.getTime ()) {
          const channel = guild.channels.cache.get ("738471925004632104");

          if (! editing) {
            const message = require ("./ utils / messageofday.js") (client, botUtils, server);
            //channel.send ('"' + message + '" \ n \ n-ReactorBot')
          }

          const message = require ("./ utils / dayInterval.js") (client, botUtils, server, guild);

          server.nextMsgOfDay = Math.floor (d.getTime () / (12 * 60 * 60 * 1000) + 2) * 12 * 60 * 60 * 1000;
        }

        return server;
      }, 5);

    }, 20 * 1000);

  } catch (err) {
    console.log (`=> $ {newError (err," ClientReady ")}`);
  }
}