import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

// ініціалізація lightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// створення розмітки ОДНОЇ картинки
function createImageCard(image) {
  return `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
          loading="lazy"
        />
      </a>

      <div class="info">
        <p><b>Likes</b> ${image.likes}</p>
        <p><b>Views</b> ${image.views}</p>
        <p><b>Comments</b> ${image.comments}</p>
        <p><b>Downloads</b> ${image.downloads}</p>
      </div>
    </li>
  `;
}

// створення галереї
export function createGallery(images) {
  const markup = images.map(createImageCard).join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

// очистка галереї
export function clearGallery() {
  refs.gallery.innerHTML = '';
}

// показ loader
export function showLoader() {
  refs.loader.classList.remove('is-hidden');
}

// приховати loader
export function hideLoader() {
  refs.loader.classList.add('is-hidden');
}
