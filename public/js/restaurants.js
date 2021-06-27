async function restaurantFormHandler(event) {
  event.preventDefault();

  const cuisine = document.querySelector("#cuisine").value;
  const rating = document.querySelector("#rating").value;
  const price = document.querySelector("#price").value;
  const zipcode = document.querySelector("#zipcode").value.trim();
  
  if (zipcode) {
    const response = await fetch("/restaurants/yelp", {
      method: "POST",
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
      document.location.reload();
    } else {
      throw new Error(response.status + " failed fetch");
    }
  } else {
    alert("Please enter zipcode");
  }
}

document
  .querySelector("#fork-btn")
  .addEventListener("click", restaurantFormHandler);
