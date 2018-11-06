const { DOMAIN, CLIENT_ID, CLIENT_SECRET, REACT_APP_CLIENT } = process.env;
const passport = require("passport");
const AuthStrategy = require("passport-auth0");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new AuthStrategy(
      {
        domain: DOMAIN,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "/login",
        scope: "openid"
      },
      (_, __, ___, profile, done) => done(null, profile)
    )
  );

  passport.serializeUser((user, done) => {
      const db = app.get('db');
      console.log('user', user)
   
    db.climbers
      .get_climber_by_authid(user.id)
      .then(response => {
        if (!response[0]) {
          db.climbers
            .add_climber_by_authid([user.id])
            .then(res => {
              console.log('response', res)
              done(null, res[0])})
            .catch(err => done(err, null));
        } else {
          return done(null, response[0]);
        }
      })
      .catch(err => done(err, null));
   });
  passport.deserializeUser((user, done) => done(null, user));

  app.get(
    "/login",
    passport.authenticate("auth0", {
      successRedirect: "/success",
      failureRedirect: "/failure"
    })
  );

  app.get("/success", (req, res) => {
    console.log(req.user);
    res.redirect(REACT_APP_CLIENT);
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(()=> {
      res.redirect('/')
    })
  })
  
};