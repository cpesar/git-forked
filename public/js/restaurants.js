async function restaurantFormHandler(event) {
    event.preventDefault();

    const cuisine = document.querySelector("#cuisine").value;
    const rating = document.querySelector("#rating").value;
    const price = document.querySelector("#price").value;
    const zipcode = document.querySelector("#zipcode").value.trim();

    if (cuisine || rating || price || zipcode) {
        let response = await fetch("/restaurants", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            params: {
                cuisine: `${cuisine}`,
                rating: `${rating}`,
                price: `${price}`,
                zipcode: `${zipcode}`
            },
        })
        if (response.ok) {
            console.log(response);
        } else {
            alert("Please select all options.");
        }
    }
}

document
    .querySelector("#restaurant-form")
    .addEventListener("submit", restaurantFormHandler);
