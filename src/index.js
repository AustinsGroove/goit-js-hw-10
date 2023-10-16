import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const select = document.querySelector('select.breed-select');
const waitingMessage = document.querySelector('p.loader');
const errorMessage = document.querySelector('p.error');
const catInfo = document.querySelector('div.cat-info');

select.classList.add('hidden');
errorMessage.classList.add('hidden');
catInfo.classList.add('hidden');

fetchBreeds()
  .then(breedsArr => {
    renderBreeds(breedsArr);
  })
  .catch(error => errorHandler(error));

select.addEventListener('change', selectHandler);

function renderBreeds(breedsArr) {
  //   console.log(breedsArr);
  const markup = breedsArr
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
  select.insertAdjacentHTML('beforeend', markup);
  waitingMessage.classList.add('hidden');
  select.classList.remove('hidden');
}

function selectHandler(event) {
  catInfo.classList.add('hidden');
  waitingMessage.classList.remove('hidden');
  fetchCatByBreed(event.currentTarget.value)
    .then(responseData => {
      renderCatInfo(responseData);
    })
    .catch(error => errorHandler(error));
}

function renderCatInfo(responseData) {
  const breedData = responseData[0];
  const breedInfo = breedData.breeds[0];

  const breedImage = breedData.url;
  const breedName = breedInfo.name;
  const breedDescription = breedInfo.description;
  const breedTemperament = breedInfo.temperament;

  const markup = `
  <div class="image-box">
      <img class="cat-image"
  src="${breedImage}"
  alt="${breedName} photo"
  width = "300px"
  height = "auto"
  />
  </div>
  <div class="description">
      <h1>${breedName}</h1>
      <p>${breedDescription}</p>
      <p><span class="bold">Temperament: </span>${breedTemperament}</p>
      </div>
      `;
  catInfo.innerHTML = markup;
  catInfo.classList.remove('hidden');
  waitingMessage.classList.add('hidden');
}

function errorHandler(error) {
  console.log(error);
  //   errorMessage.classList.remove('hidden');
  waitingMessage.classList.add('hidden');
  catInfo.classList.add('hidden');
  select.classList.add('hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

// Styles
Notiflix.Notify.init({
  width: '280px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
  timeout: 7000,
});
const documentHead = document.querySelector('head');
const innerStyles = `<style type="text/css">
.bold {
font-weight: bold;
}
.hidden {
      position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
.error {
    color: red;
}
.breed-select {
    margin: 15px;
    padding: 5px;
}
.cat-info {
    display: flex;
    gap: 30px
    align-items: center;
    align-content: flex-start;
}
.loader {
    font-weight: bold;
}
.image-box {
display: flex;
  width: 50vw;
  align-items: center;
  align-content: center;
  jujustify-content: center;
}
.cat-image {
    display: block;
  width: 100%;
  object-fit: contain;

}
.description {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
}
.loading {
    position: fixed;
    top: 45%;
  left: 47%;
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>`;
documentHead.insertAdjacentHTML('beforeend', innerStyles);
