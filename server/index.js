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
const { DOMAIN, CLIENT_ID, CLIENT_SECRET, AS3_ACCESS_KEY_ID, 
  AS3_SECRET_ACCESS_KEY, S3_BUCKET_AVI} = process.env;

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
  createNewProfile,
  getMag
} = require("./Controllers/mainCtrl");

const port = process.env.SERVER_PORT || 3333;

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
  region: 'us-east-1',
   accessKeyId: AS3_ACCESS_KEY_ID,
   secretAccessKey: AS3_SECRET_ACCESS_KEY 
});
app.use(
 "/s3",
 require("react-s3-uploader/s3router")({
   bucket: S3_BUCKET_AVI,
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

  process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.use(passport.initialize());
app.use(passport.session());

app.use('/s3', require('react-s3-uploader/s3router')({
  bucket: S3_BUCKET_AVI,
  region: 'us-east-1',
  headers: {'Access-Control-Allow-Origin': '*'}, // optional
  ACL: 'public-read', // private is the default
  uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
}));


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
      console.log("done: ", done);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  const db = app.get("db");
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

passport.deserializeUser((user, done) => {
  done(null, user)
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: 'http://127.0.0.1:3000/plan',
    // successRedirect: 'http://www.rrgclimb.com/plan',
    failureRedirect: '/login'
  })
);

app.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('http://127.0.0.1:3000/');
  // res.redirect('http://www.rrgclimb.com/');
});

const sign_s3 = (req,res) => {
  const s3 = new AWS.S3();  // Create a new instance of S3
  console.log("backenddddd s3 variable", s3);
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  const s3Params = {
      Bucket: S3_BUCKET_AVI,
      Key: fileName,
      Expires: 500,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        res.json({success: false, error: err})
      }

      const returnData = {
          signedRequest: data,
          url: `https://${S3_BUCKET_AVI}.s3.amazonaws.com/${fileName}`
        };

        res.json({success:true, data:{returnData}});
      });
}

// Endpoints
app.get("/api/user", (req, res) => {
  console.log(req.session);
  res.status(200).json(req.session);
});
app.get(`/api/weather`, getCoordinate);
app.get(`/api/routes`, getRoutes);
app.get(`/api/table`, getTable);
app.get(`/api/everyone`, getEveryonesDescription)
app.get(`/api/user`, getUser)
app.get('/api/routePic:id', getRoutePic)
app.get('/api/mag', getMag)

app.post(`/api/test/:id`, addRoute);
app.post(`/api/sign_s3`, sign_s3)
app.put(`/api/description/:id`, update);

app.put(`/api/image`, addImage);
app.put(`/api/routePic/:id/:userid`, routePic);
app.put(`/api/iGotIt/:id`, iGotIt)
app.put(`/api/timestamp/:id`, updateTime)
app.put(`/api/rating/:id`, createRating)
app.put(`/api/username`, createProfile)
app.put(`/api/profile`, createNewProfile)

app.delete(`/api/table/:id`, deleteRouteFromJournal);

app.use( express.static( `${__dirname}/../build/` ) );
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log(`Nothin can stop me im All the wayyyy upppp: ${port}`);
});
