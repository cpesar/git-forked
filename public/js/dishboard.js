const axios = require('axios');
require('dotenv').config();

let API_KEY = process.env.GIT_FORKED_API_KEY_YELP;

// REST
let yelpREST = axios.create({
    baseURL: "https://api.yelp.com/v3/",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-type": "application/json",
    },
})

yelpREST("/businesses/search", {
    params: {
        location: "84025",
        term: "coffee",
        limit: 5,
    },
}).then(({ data }) => {
    let { businesses } = data
    businesses.forEach((b) => {
        let foodInfo = `Name: ${b.name}\nCategories: ${b.categories[0].title}\nPrice: ${b.price}\nRating: ${b.rating}\nURL: ${b.url}\nImage: ${b.image_url}`;
        console.log(foodInfo);
    })
})
