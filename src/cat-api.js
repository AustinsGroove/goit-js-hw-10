const REGKEY =
  'live_ZYJR9jDjLsZ4MHvcR16rfZOS9PxkNesp7fYol6L7SfLz3T61bXpdC6rdlxtNwR0q';
const fetchParams = {
  headers: {
    'x-api-key': `${REGKEY}`,
  },
};

function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds`, fetchParams)
    .then(response => {
      // console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}

function fetchCatByBreed(breed) {
  //   console.log(breed);
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`,
    fetchParams
  )
    .then(response => {
      // console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}

export { fetchBreeds, fetchCatByBreed };
