const router = require("express").Router();

const userRoutes = require("./user-routes");
const favoriteRoutes = require("./favorite-routes");

router.use("/users", userRoutes);
router.use("/favorite", favoriteRoutes);


module.exports = router;
