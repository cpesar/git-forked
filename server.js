const yelp = require("yelp-fusion");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: process.env.DB_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  cookie: {
    maxAge: 300000,
  },
};

app.use(session(sess));

// Middleware
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));

// Passport


sequelize.synce({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Not listening"));
});

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey =
  "DHmWB-a1nSjotErXJL_b53ewWTwXBd0eFmd9jWRuK9JcNllyH-gkSF8EkhpoqxV1R40uKT_s57h4Tt10JWTbCLV4p9hP2qhhvD97OW3mL-ztuN5wSN2WVTPajKXKYHYx";

const searchRequest = {
  categories: "sushi",
  location: "salt lake city, ut",
};

const client = yelp.client(apiKey);

client
  .search(searchRequest)
  .then((response) => {
    const result = response.jsonBody.businesses;
    const prettyJson = JSON.stringify(result, null, 4);
    console.log(prettyJson);
  })
  .catch((e) => {
    console.log(e);
  });
