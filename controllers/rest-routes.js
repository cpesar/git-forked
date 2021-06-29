const axios = require("axios");
require("dotenv").config();
const router = require("express").Router();

const { withAuth } = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  // if(req.session.loggedIn){
  res.render("restaurant", {
    title: "Restaurants",
    pageTitle: "Restaurants"
  });
  // }
});

router.post("/restaurants", (req, res) => {
  let API_KEY = process.env.DB_API_KEY;
  console.log(API_KEY, "API KEY:")
  let zipcode = req.body.zipcode;
  let rating = req.body.rating;
  let price = req.body.price;
  let cuisine = req.body.cuisine;

      var config = {
        method: "get",
        // url:`https://randomuser.me/api/?results=50&nat=us`,
        url: `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipcode}&rating=${rating}&price=${price}&categories=${cuisine}&limit=10`,
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      axios(config)
        .then(function (response) {
          return res.json(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    // ; (async () => {
    //   const response = await axios({
    //     // url:`https://randomuser.me/api/?results=50&nat=us`,
    //     url: `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipcode}&rating=${rating}&price=${price}&categories=${cuisine}&limit=10`,
    //     method: 'get'
    //   })

    //   console.log(response.body);
    // })()
});



module.exports = router;
