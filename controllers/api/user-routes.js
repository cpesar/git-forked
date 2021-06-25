//USER-LOGIN
const router = require("express").Router();
const { User } = require("../../models");

//CREATE A NEW USER ROUTE
//http://localhost:3001/api/users
router.post("/", (req, res) => {
  // res.json({ message: 'Does this work? '});
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((newUser) => {
      req.session.save(() => {
        (req.session.user_id = newUser.id),
          (req.session.password = newUser.password);
        req.session.loggedIn = true;

        res.json(newUser);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//  GET ALL USERS
//  http://localhost:3001/api/users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET USER BY ID
// http://localhost:3001/api/users/<id>
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    // CAN WE ADD SOME QUERY TO SEARCH FOR THE USER BY--- FAVORITES?
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "Wrong forker" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//USER LOGIN ROUTE
//localhost:3001/api/user/
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((newUser) => {
    if (!newUser) {
      res.status(400).json({ message: "Forker not found" });
      return;
    }
    const userPassword = newUser.checkPassword(req.body.password);
    if (!userPassword) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }
    req.session
      .save(() => {
        req.session.user_id = newUser.id;
        req.session.password = newUser.password;
        req.session.loggedIn = true;

        res.json({ user: newUser, message: "Great Success!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});

//USER LOGOUT ROUTE
//localhost:3001/api/user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    //IF THE USER IS LOGGED IN, SAVE THE SESSION
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
