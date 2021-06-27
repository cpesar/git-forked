async function restaurantFormHandler(event) {
    event.preventDefault();

    const cuisine = document.querySelector("#cuisine").value;
    const rating = document.querySelector("#rating").value;
    const price = document.querySelector("#price").value;
    const zipcode = document.querySelector("#zipcode").value.trim();

    if (cuisine || rating || price || zipcode) {
        // let response = await fetch("/restaurants", {
        //     method: "GET",
        //     headers: { "Content-Type": "application/json" },
        //     params: {
        //         cuisine: `${cuisine}`,
        //         rating: `${rating}`,
        //         price: `${price}`,
        //         zipcode: `${zipcode}`
        //     }
        // });

        // if (response.ok) {
        //     console.log(response.params);
        // } else {
        //     alert("Please select all options.");
        // }
        ; (async () => {
            const response = await axios({
              url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipcode}&rating=${rating}&price=${price}&categories=${cuisine}&limit=10`,
              method: 'get'
            })
      
            console.log(response.body);
          })()
    }
}

document
    .querySelector("#restaurant-form")
    .addEventListener("submit", restaurantFormHandler);
