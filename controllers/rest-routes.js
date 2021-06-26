const router = require("express").Router();
const { withAuth } = require("../utils/auth");

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.render("restaurant", { title: "Restaurants" });
  }
  res.redirect("/login");
});

module.exports = router;
