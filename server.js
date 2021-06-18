const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'DHmWB-a1nSjotErXJL_b53ewWTwXBd0eFmd9jWRuK9JcNllyH-gkSF8EkhpoqxV1R40uKT_s57h4Tt10JWTbCLV4p9hP2qhhvD97OW3mL-ztuN5wSN2WVTPajKXKYHYx';

const searchRequest = {
    categories: 'sushi',
    location: 'salt lake city, ut'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
    const result = response.jsonBody.businesses;
    const prettyJson = JSON.stringify(result, null, 4);
    console.log(prettyJson);
}).catch(e => {
    console.log(e);
});