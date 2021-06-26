async function restaurantFormHandler(event) {
  event.preventDefault();

  const cuisine = document.querySelector("#cuisine").value;
  const rating = document.querySelector("#rating").value;
  const price = document.querySelector("#price").value;
  const zipcode = document.querySelector("#zipcode").value.trim();

  const data = await fetch("/restaurants/yelp", {
    method: "post",
    body: JSON.stringify({
      cuisine,
      rating,
      price,
      zipcode,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response) {
        console.log(response);
      } else {
        alert("Please select all options.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

document
  .querySelector(".restaurant-form")
  .addEventListener("submit", restaurantFormHandler);
