require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const AWS = require("aws-sdk");
const path = require('path');
const { DOMAIN, CLIENT_ID, CLIENT_SECRET, S3_BUCKET, AS3_ACCESS_KEY_ID, AS3_SECRET_ACCESS_KEY} = process.env;

const app = express();

// Require functions from main controller
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
  getUser,
  createProfile,
  addImage,
  routePic,
  getRoutePic,
  createNewProfile
} = require("./Controllers/mainCtrl");

const port = process.env.SERVER_PORT || 3001;

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

AWS.config.update({
    accessKeyId: AS3_ACCESS_KEY_ID,
    secretAccessKey: AS3_SECRET_ACCESS_KEY 
});
app.use(
  "/s3",
  require("react-s3-uploader/s3router")({
    bucket: S3_BUCKET,
    region: "us-east-1",
    headers: { "Access-Control_Allow-Origin": "*" },
    ACL: "public-read"
  })
);

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(passport.initialize());
app.use(passport.session());
app.use( express.static( `${__dirname}/../build/` ) );

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
  // console.log('user currently logged in', user)
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
    successRedirect: 'http://localhost:3000/plan',
    // successRedirect: 'http://68.183.125.227:8080/plan/',
    // successRedirect: 'http:www.rrgclimb/plan/',
    failureRedirect: "/login"
  })
);

app.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('http://localhost:3000/');
  // res.redirect('http://68.183.125.227:8080/');
  // res.redirect('http://www.rrgclimb.com/');
});

// Endpoints
app.get("/api/user", (req, res) => {
  res.status(200).json(req.session);
});
app.get(`/api/weather`, getCoordinate);
app.get(`/api/routes`, getRoutes);
app.get(`/api/table`, getTable);
app.get(`/api/everyone`, getEveryonesDescription)
app.get(`/api/user`, getUser)
app.get('/api/routePic:id', getRoutePic)

app.post(`/api/test/:id`, addRoute);
app.put(`/api/description/:id`, update);

app.put(`/api/image`, addImage);
app.put(`/api/routePic/:id/:userid`, routePic);
app.put(`/api/iGotIt/:id`, iGotIt)
app.put(`/api/timestamp/:id`, updateTime)
app.put(`/api/rating/:id`, createRating)
app.put(`/api/username`, createProfile)
app.put(`/api/profile`, createNewProfile)

app.delete(`/api/table/:id`, deleteRouteFromJournal);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log(`Nothin can stop me im All the wayyyy upppp: ${port}`);
});
