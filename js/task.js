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
const imagesArray = gallery.map(image => image.original);

function onArrowPress(e) {
  let imageIndex;
  let imageSrc = refs.lightBoxImageRef.src;

  if (e.code === 'ArrowLeft') {
    imageIndex = imagesArray.indexOf(imageSrc);

    if (imagesArray.length > imageIndex - 1 && imageIndex !== 0) {
      console.log('Нажата стрелка влево');
      imageSrc = imagesArray[imageIndex - 1];
    } else {
      imageSrc = imagesArray[imagesArray.length - 1];
    }
  } else if (e.code === 'ArrowRight') {
    imageIndex = imagesArray.indexOf(imageSrc);

    if (imagesArray.length > imageIndex + 1) {
      imageSrc = imagesArray[imageIndex + 1];
    } else {
      imageSrc = imagesArray[0];
    }
  }

  refs.lightBoxImageRef.src = imageSrc;
}

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
  window.addEventListener('keydown', onArrowPress);
}

function onCloseModal() {
  refs.lightBoxImageRef.src = '';
  refs.lightBoxRef.classList.remove('is-open');
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowPress);
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
