// Здесь происходит импорт массива galleryItems из файла gallery - items.js, который содержит информацию о предварительных, оригинальных изображениях и их описаниях.

import { galleryItems } from "./gallery-items.js";
// Change code below this line

//======= Этот код создает интерактивную галерею изображений на веб-странице с использованием библиотеки SimpleLightbox.

const galleryContainer = document.querySelector(".gallery");

// Создание разметки галереи: С помощью функции createGalleryMarkup вы генерируете разметку для галереи на основе массива galleryItems.
const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
   <a class="gallery__link" 
   href="${original}">
      <img class="gallery__image"
      src="${preview}" 
      alt="${description}"
      title= "${description}"
      loading="lazy"/>
    
   </a>
</li>`;
    })
    .join("");
}

// Вставка разметки в контейнер галереи: С помощью galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup); вы вставляете сгенерированную разметку внутрь контейнера галереи.
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

// Этот код добавляет обработчик события клика на контейнере галереи.
galleryContainer.addEventListener("click", open);

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt", // Атрибут, из которого брать текст для подписи к изображению
  captionsDelay: 250, // Задержка перед показом подписи (в миллисекундах) после открытия изображения

  closeText: "<button class='custom-close' type='button'> &times; </button>",
  navText: [
    "<span class='custom-prev'>&#8249;</span>",
    "<span class='custom-next'>&#8250;</span>",
  ],
});
