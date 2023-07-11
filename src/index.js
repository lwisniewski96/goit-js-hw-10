import axios from 'axios';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const apiKey =
  'live_6KAVStywcWEVPHdMsUFNQRaRch7j5SM63Fymv0HFVaYmCYtTO40onDdiry4YC7yk';
axios.defaults.headers.common['x-api-key'] = apiKey;

// Funkcja, która pobiera losowe dane o kocie z The Cat API
function getRandomCatData() {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.textContent = '';

  axios
    .get('https://api.thecatapi.com/v1/images/search')
    .then(response => {
      const catData = response.data[0];
      const catImageUrl = catData.url;
      const catImageElement = document.createElement('img');
      catImageElement.src = catImageUrl;
      catInfo.appendChild(catImageElement);
    })
    .catch(error => {
      console.error(error);
      error.style.display = 'block';
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

// Wywołanie funkcji, aby pobrać i wyświetlić losowe dane o kocie
getRandomCatData();


// o co chodzi