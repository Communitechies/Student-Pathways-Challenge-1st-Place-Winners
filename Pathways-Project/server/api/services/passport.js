// file:app/authenticate/init.js
import passport from 'passport';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const User = mongoose.model('User');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'studentID',
    passReqToCallback: true,
  }, (req, studentID, password, done) => {
    return User.findOne({ studentID }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, false, {
          message: 'User Already Exists',
        });
      }

      const newUser = new User();

      newUser._id = mongoose.Types.ObjectId();
      newUser.studentID = studentID;
      newUser.name = req.body.name;
      newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

      // save the user
      newUser.save((err) => {
        if (err) {
          throw err;
        }
        return done(null, newUser);
      });
    });
}));

passport.use('local-login',
  new LocalStrategy({
    usernameField: 'studentID',
    passReqToCallback: false,
  }, (studentID, password, done) => {
    User.findOne({ studentID }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          message: "User doesn't exists",
        });
      }

      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      }

      return done(null, false, {
        message: "Password isn't correct",
      });
    });
  }));
