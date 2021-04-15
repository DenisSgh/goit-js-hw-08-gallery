import gallery from './gallery-items.js';

const refs = {
  galleryRef: document.querySelector('.js-gallery'),
  lightBoxRef: document.querySelector('.js-lightbox'),
  lightBoxImageRef: document.querySelector('.lightbox__image'),
  buttonCloseRef: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  backdropRef: document.querySelector('.lightbox__overlay'),
};

refs.galleryRef.addEventListener('click', onPictureClick);
refs.buttonCloseRef.addEventListener('click', onCloseModal);
refs.backdropRef.addEventListener('click', onCloseModal);

const createItems = ({ preview, original, description }) => {
  return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"></a></li>`;
};

function addItemsToGallery(newItems) {
  refs.galleryRef.insertAdjacentHTML(
    'beforeend',
    newItems.map(createItems).join(''),
  );
}

addItemsToGallery(gallery);

function onPictureClick(e) {
  e.preventDefault();
  if (e.target.classList.contains('gallery__image')) {
    refs.lightBoxImageRef.src = e.target.dataset.source;
    onOpenModal();
  }
}

function onOpenModal() {
  refs.lightBoxRef.classList.add('is-open');
  window.addEventListener('keydown', onEscKeyPress);
}

function onCloseModal() {
  refs.lightBoxImageRef.src = '';
  refs.lightBoxRef.classList.remove('is-open');
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
