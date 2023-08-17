import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Общий сценарий: Когда пользователь кликает на маленькое изображение, код создает модальное окно с большим изображением, отображает его и начинает слушать события клавиатуры для обработки нажатия клавиши "Escape". Когда пользователь нажимает "Escape" или кликает на кнопку "Close", модальное окно закрывается, и слушатель события клавиатуры удаляется.

const galleryContainer = document.querySelector(".gallery");

// Создание разметки галереи: С помощью функции createGalleryMarkup вы генерируете разметку для галереи на основе массива galleryItems.
const galleryMarkup = createGalleryMarkup(galleryItems);

// Вставка разметки в контейнер галереи: С помощью galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup); вы вставляете сгенерированную разметку внутрь контейнера галереи.
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
<li class="gallery__item">
      <a class="gallery__link" href="large-image.jpg">
        <img
          class="gallery__image lazyload"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
          loading="lazy"
        />
      </a>
    </li>`;
    })
    .join("");
}

// onGalleryContainerClick(evt): Это обработчик события клика на контейнере галереи. Он открывает модальное окно с большим изображением, когда пользователь кликает на маленькое изображение.
function onGalleryContainerClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const largeImageURL = evt.target.dataset.source;

  const instance = basicLightbox.create(
    `
    <div class="modal">
               <img src="${evt.target.dataset.source}" alt="${evt.target.alt}" width="800" height="600"/>
 <a>Close</a>
    </div>
`,
    {
      onShow: (instance) => console.log("onShow", instance),
      onClose: (instance) => console.log("onClose", instance),
    }
  );

  // instance.show(): Этот метод открывает модальное окно.
  instance.show();

  //  обработчик клика на изображение
  const modalImage = instance.element().querySelector("img");
  modalImage.addEventListener("click", () => {
    instance.close();
  });

  // Вложенная функция onEscKeyPress(event): Эта функция отвечает за обработку нажатия клавиши "Escape" и закрытие модального окна. Вы добавляете слушатель события клавиатуры для этой функции при открытии модального окна и удаляете его при закрытии модального окна.
  function onEscKeyPress(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      instance.close();
      document.removeEventListener("keydown", onEscKeyPress);
    }
  }
  document.addEventListener("keydown", onEscKeyPress);
}

//  код ниже реализует ленивую загрузку изображений с использованием feature detection (определения возможностей браузера) для определения, поддерживается ли атрибут loading у элемента img. Вот по шагам, что происходит в этом коде:
// Проверка поддержки атрибута loading: Сначала код проверяет, поддерживает ли браузер атрибут loading для элементов img. Если атрибут поддерживается, код выбирает все изображения с атрибутом loading="lasy" (или, возможно, опечатка, и должно быть loading="lazy") и устанавливает их атрибут src равным значению атрибута data-src.
// Подключение библиотеки Lazysizes: Если браузер не поддерживает атрибут loading, то код создает элемент <script> и добавляет его в конец <body>, чтобы загрузить библиотеку Lazysizes. Это позволяет использовать ленивую загрузку изображений в браузерах, которые не поддерживают атрибут loading.
// Выбор всех изображений для ленивой загрузки: После проверки, независимо от выбранной стратегии загрузки, код выбирает все изображения с атрибутом data-src.
// Добавление обработчика события load: Для каждого выбранного изображения добавляется обработчик события load, который будет вызван, когда изображение полностью загрузится. Это можно использовать, например, чтобы добавить анимацию или другие действия после загрузки изображения.
// В итоге, этот код обеспечивает ленивую загрузку изображений на странице в зависимости от возможностей браузера, используя подход feature detection и, если необходимо, подключая библиотеку Lazysizes для более широкой поддержки.
if ("loading" in HTMLImageElement.prototype) {
  const lasyImages = document.querySelectorAll('img[loading="lasy"]');
  lasyImages.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossorigin = "anonymous";
  script.referrerpolicy = "no-referrer";
  document.body.appendChild(script);
}
const lasyImages = document.querySelectorAll("img[data-src]");
lasyImages.forEach((image) => {
  image.addEventListener("load", onImageLoaded, { once: true });
});
