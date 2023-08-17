// Здесь происходит импорт массива galleryItems из файла gallery - items.js, который содержит информацию о предварительных, оригинальных изображениях и их описаниях.

import { galleryItems } from "./gallery-items.js";
// Change code below this line

//======= Этот код создает интерактивную галерею изображений на веб-странице с использованием библиотеки SimpleLightbox.

const galleryContainer = document.querySelector(".gallery");

// Создание разметки галереи: С помощью функции createGalleryMarkup вы генерируете разметку для галереи на основе массива galleryItems.
const galleryMarkup = createGalleryMarkup(galleryItems);

// Этот код добавляет обработчик события клика на контейнере галереи.
galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item gallery">
   <a class="gallery__link" 
   href="${original}">
      <img class="gallery__image"
      src="${preview}" 
      alt="${description}"
      title= "${description}"/>
   </a>
</li>`;
    })
    .join("");
}

// Вставка разметки в контейнер галереи: С помощью galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup); вы вставляете сгенерированную разметку внутрь контейнера галереи.
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

// onGalleryContainerClick(evt): Это обработчик события клика на контейнере галереи. Он открывает модальное окно с большим изображением, когда пользователь кликает на маленькое изображение.

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt", // Атрибут, из которого брать текст для подписи к изображению
    captionsDelay: 250, // Задержка перед показом подписи (в миллисекундах) после открытия изображения

    sourceAttr: "href", // Атрибут, из которого брать URL изображения
    overlay: true, // Показывать ли затемнение фона (overlay) при открытии модального окна
    overlayOpacity: 0.7, // Уровень прозрачности затемнения фона
    spinner: true, // Показывать ли спиннер загрузки при открытии изображения
    nav: true, // Показывать ли кнопки навигации (стрелки) для пролистывания изображений
    // navText: "<>", // Кастомный текст или HTML для кнопок навигации (в данном случае, символы стрелок <>)
    captions: true, // Показывать ли подписи к изображениям
    captionSelector: "img", // Селектор элемента, содержащего подпись к изображению
    captionType: "attr", // Тип подписи (может быть "text" для простого текста)

    captionPosition: "bottom", // Позиция подписи (может быть "bottom", "top", "left", "right")
    close: true, // Показывать ли кнопку закрытия модального окна
    // closeText: "×", // Кастомный текст или HTML для кнопки закрытия (в данном случае, символ "×")
    swipeClose: true, // Разрешать ли закрытие модального окна с помощью жеста свайпа (перетаскивания) на сенсорных устройствах
    animationSpeed: 250, // Скорость анимации при открытии и закрытии модального окна (в миллисекундах)
    animationSlide: true, // Использовать ли анимацию при смене изображений

    closeText: "<button class='custom-close' type='button'> &times; </button>",
    navText: [
      "<span class='custom-prev'>&#8249;</span>",
      "<span class='custom-next'>&#8250;</span>",
    ],
  });
}
