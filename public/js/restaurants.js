require('dotenv').config();
const API_KEY = process.env.GIT_FORKED_API_KEY_YELP;
const { response } = require('express');
const axios = require('axios');

async function restSearchHandler(event) {
    event.preventDefault();

    const cuisine = document.getElementById('cuisine').val();
    const rating = document.getElementsById('rating').val();
    const price = document.getElementsById('price').val();
    const locale = document.getElementsById('zipcode').val();

    let yelpREST = axios.create({
        baseURL: "https://api.yelp.com/v3/",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-type": "application/json",
        }
    })

    yelpREST("/businesses/search", {
        params: {
            term: `${cuisine}`,
            rating: `${rating}`,
            price: `${price}`,
            location: `${locale}`,
            limit: 5
        },
    })
        .then(({ data }) => {
            let { businesses } = data
            businesses.forEach((b) => {
            let foodInfo = `Name: ${b.name}\nCategories: ${b.categories[0].title}\nPrice: ${b.price}\nRating: ${b.rating}\nURL: ${b.url}\nImage: ${b.image_url}`;
            console.log(foodInfo);
        })
    })

    document
        .getElementsById('search-btn')
        .addEventListener('submit', restSearchHandler);
}




