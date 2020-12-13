const {Users, Clans} = require ("../ database.js");
const botUtils = require ("../ utils.js");

newError = botUtils.newError;

Users.findById ("user id", (errDB, doc) => {
   // If there is an error in the database
   if (errDB) {
     console.log (`=> $ {newError (errDB," filename ")}`);
     return;
   }

   // If there is no user with this id in the database
   if (! doc) {
     // Create the new user
     let newUser = new Users ({
       _id: "user id"
     });

     // Save the new user to the database
     newUser.save ();
     return;
   }

   try {
     // Here you manipulate user data
     // Examples

     // Add 50 cash to the user
     doc.money + = 50;

     // Add 50 xp for the user
     doc.levelSystem.xp + = 50;
     doc.levelSystem.txp + = 50;

     // Save changes to the database
     doc.save ();
   } catch (err) {
     // Error handler
     console.log (`=> $ {newError (err," filename ")}`);
   }
});