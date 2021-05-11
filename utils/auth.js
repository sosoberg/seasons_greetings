

 // app.post('/login', passport.authenticate('local', { successRedirect: '/',
  //failureRedirect: '/login' }));


const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

const withAuth = (req, res, next) => {

  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
  
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ))};

module.exports = withAuth;