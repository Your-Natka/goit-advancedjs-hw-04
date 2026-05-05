import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

let query = '';
let page = 1;

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

// 🔍 Пошук
form.addEventListener('submit', async e => {
  e.preventDefault();

  query = e.target.elements['search-text'].value.trim();

  // ❗ перевірка пустого інпуту
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();

  try {
    showLoader();

    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({ message: 'Nothing found' });
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / 15);

    // ✅ показ / приховування кнопки
    if (totalPages > 1) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    form.reset();
  } catch (error) {
    iziToast.error({ message: 'Error fetching images' });
  } finally {
    hideLoader();
  }
});

// ➕ Load more
loadMoreBtn.addEventListener('click', async () => {
  if (!query) return;

  page += 1;

  try {
    showLoader();
    loadMoreBtn.disabled = true;

    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / 15);

    if (page >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    // ✅ плавний скрол
    const card = document.querySelector('.gallery li');

    if (card) {
      const height = card.getBoundingClientRect().height;

      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({ message: 'Error loading more' });
  } finally {
    hideLoader();
    loadMoreBtn.disabled = false;
  }
});
