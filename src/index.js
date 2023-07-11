import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

Notiflix.Notify.init({
  position: 'center-top',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'from-right',
});

axios.defaults.headers.common['x-api-key'] =
  'live_6KAVStywcWEVPHdMsUFNQRaRch7j5SM63Fymv0HFVaYmCYtTO40onDdiry4YC7yk';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const pLoader = document.querySelector('.loader');

onPageLoad();

function onPageLoad() {
  select.style.display = 'none';
  catInfo.style.display = 'none';
  pLoader.style.display = 'block';
}

fetchBreeds()
  .then(response => {
    catInfo.style.display = 'none';
    pLoader.style.display = 'none';
    renderCatCard(response);

    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    pLoader.style.display = 'none';
  });

select.addEventListener('change', onSelectInput);
function onSelectInput(e) {
  catInfo.style.display = 'none';
  pLoader.style.display = 'block';
  fetchCatByBreed(select.value).then(catCardCreate);
}

function renderCatCard(response) {
  const markup = response
    .map(cat => {
      return `<option value="${cat.id}" descr="${cat.description}" name="${cat.name}" temp="${cat.temperament}">${cat.name}</option>`;
    })
    .join('');
  select.innerHTML = markup;
  const firstOption = `<option value="none" selected disabled hidden>Select a Cat</option>`;
  select.insertAdjacentHTML('afterbegin', firstOption);
  select.style.display = 'flex';
}
function catCardCreate(cat) {
  if (cat.length === 0) {
    Notiflix.Notify.failure('Вибачте, інформація по даному коту оновлюється');
    onPageLoad();
    pLoader.style.display = 'none';
    return;
  }
  const catName = cat[0].breeds[0].name;
  const catImg = cat[0].url;
  const catTemperamnet = cat[0].breeds[0].temperament;
  const catDescription = cat[0].breeds[0].description;

  catInfo.innerHTML = '';

  const markup = `
      <img src="${catImg}" alt="${catName}" width="480">
      <div class="info-wrapper">
      <h1>${catName}</h1>      
      <p class="cat-descr">${catDescription}</p>
      <p><span class="card-span">Temperament: </span>${catTemperamnet}</p>
      </div>`;
  catInfo.innerHTML = markup;
  pLoader.style.display = 'none';
  catInfo.style.display = 'flex';
}
