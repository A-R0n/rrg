require("dotenv").config();
const express = require("express");
// const { SESSION_SECRET: secret, CONNECTION_STRING} = process.env
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const authCtrl = require("./Controllers/auth0ctrl");
const { DOMAIN, CLIENT_ID, CLIENT_SECRET, REACT_APP_CLIENT } = process.env;

const app = express();

// Require functions from controller
const {
  createRating,
  updateTime,
  deleteRouteFromJournal,
  update,
  getCoordinate,
  getRoutes,
  addRoute,
  getTable,
  iGotIt,
  getEveryonesDescription,
  
  createProfile
} = require("./Controllers/mainCtrl");

const port = 3001;

app.use(json());
app.use(cors());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000
    }
  })
);

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "/login",
      scope: "openid"
    },
    (_, __, ___, profile, done) => {
      // console.log('prof', profile)
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  const db = app.get("db");
  console.log('user currently logged in', user)
  db.climbers
    .get_climber_by_authid([user.id])
    .then(response => {
      if (!response[0]) {
        db.climbers
          .add_climber_by_authid([user.id])
          .then(res => {
            done(null, res[0]);
          })
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
    successRedirect: "http://localhost:3000/profile",
    failureRedirect: "/login"
  })
);

app.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("http://localhost:3000/");
});

// Endpoints
app.get("/api/user", (req, res) => {
  console.log('sessss', req.user)
  res.status(200).json(req.session);
});
app.get(`/api/weather`, getCoordinate);
app.get(`/api/routes`, getRoutes);
app.get(`/api/table`, getTable);
app.get(`/api/everyone`, getEveryonesDescription)


app.post(`/api/test/:id`, addRoute);

app.put(`/api/iGotIt/:id`, iGotIt)
app.put(`/api/description/:id`, update);
app.put(`/api/timestamp/:id`, updateTime);

// redux endpoints
app.put(`/api/username`, createProfile)
// app.put(`/api/biography`, createProfile);
// app.put(`/api/location`, createProfile);

app.put(`/api/rating/:id`, createRating)

app.delete(`/api/table/:id`, deleteRouteFromJournal);

app.listen(port, () => {
  console.log(`All the wayyyy upppp: ${port}`);
});
