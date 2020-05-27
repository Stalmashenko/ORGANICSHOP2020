const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {Users} = require('../models/sequelize.js');
// Load User model

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      console.log(email);
      Users.findOne( { where: {email: email}})
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {

  // console.log('calling deserial' + userId);
  // // TODO: findByPk syntax? findById deprecated? Try later after sucessfully record data in DB
  Users.findOne({ where: { id: userId } })
      .then(function(user){
        // console.log(user);
       return  done(null, userId);
      }).catch(function(err){
        done(err, null);
      });
  // return done(null, id);
});
};
