'use strict';

require('dotenv').config();
const API_KEY = process.env.GIT_FORKED_API_KEY_YELP;
const yelp = require('yelp-fusion');
const client = yelp.client(API_KEY);


// REST
$(document).ready(function () {
    $('.search-btn').click(function (e) {
        const cuisine = $('#cuisine');
        const rating = $('#rating');
        const price = $('#price');
        const locale = $('#zipcode');
        e.preventDefault();
        client.search({
            term: `${cuisine}`,
            location: `${locale}`,
            rating: `${rating}`,
            price: `${price}`,
            limit: 1
        }).then((res) => {
            let foodInfo = JSON.stringify(res, null, 4);
            console.log(foodInfo);
        }).catch((err) => {
            console.log(err);
        });
    })
})

// let yelpREST = axios.create({
//     baseURL: "https://api.yelp.com/v3/",
//     headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-type": "application/json",
//     },
// })

// yelpREST("/businesses/search", {
//     params: {
//         location: "84025",
//         term: "coffee",
//         limit: 5,
//     },})
// .then(({ data }) => {
//     let { businesses } = data
//     businesses.forEach((b) => {
//         let foodInfo = `Name: ${b.name}\nCategories: ${b.categories[0].title}\nPrice: ${b.price}\nRating: ${b.rating}\nURL: ${b.url}\nImage: ${b.image_url}`;
//         console.log(foodInfo);
//     })
// })

// axios.get(`https://api.yelp.com/v3/businesses/search?location=84025&term=mexican&rating=3&limit=2`, {
//     headers: {
//         Authorization: `Bearer ${API_KEY}`
//     }
// })
//     .then((res) => {
//         console.log(res.data.businesses);
//     })
//     .catch((err) => {
//         console.log(err);
//     })