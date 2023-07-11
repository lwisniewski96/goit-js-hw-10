export const fetchCatByBreed = function (id) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&api_key=live_2jIJfwcZBQTHZg4p85o314KTbd5zRvyg8dxZzmKirNbBbL8mHf7vy0nplnD7JLOE`
  )
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
