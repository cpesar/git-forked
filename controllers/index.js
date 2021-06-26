//NAVIGATION ROUTES

const router = require("express").Router();

const apiRoutes = require("./api");
const dishboardRoutes = require("./dishboard-routes");
const homepageRoutes = require("./homepage-routes");
const restRoutes = require("./rest-routes");

router.use("/dishboard", dishboardRoutes);
router.use("/", homepageRoutes);
router.use("/api", apiRoutes);
router.use("/restaurants", restRoutes);

module.exports = router;
