//FRONT END ROUTES- NEED TO COLLAB WITH JIM FOR HANDLEBARS
const router = require("express").Router();

<<<<<<< HEAD
// router.use()

const router = require('express').Router();
const sequelize = require('../config/connection');

const { User } = require('../models');
const homepageRoutes = require('./api/user-routes');
=======
const { User } = require("../models");
const homepageRoutes = require("./api/user-routes");
>>>>>>> feature/authentication


router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/restaurants");
    return;
  }
  res.render("homepage", { title: "Homepage" });
});

module.exports = router;
