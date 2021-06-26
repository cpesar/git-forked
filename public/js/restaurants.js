async function restaurantFormHandler(event) {
  event.preventDefault();

  const cuisine = document.querySelector("#cuisine").value;
  const rating = document.querySelector("#rating").value;
  const price = document.querySelector("#price").value;
  const zipcode = document.querySelector("#zipcode").value.trim();

  if (cuisine || rating || price || zipcode) {
    const response = await fetch("/restaurants/yelp", {
      method: "post",
      body: JSON.stringify({
        cuisine,
        rating,
        price,
        zipcode,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(response);
    } else {
      alert("Please select all options.");
    }
  }
}

document
  .querySelector(".restaurant-form")
  .addEventListener("submit", restaurantFormHandler);
