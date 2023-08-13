import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");
gallery.insertAdjacentHTML("beforeend", createGallery(galleryItems));
gallery.addEventListener("click", onClick);

function createGallery(array) {
  return array
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

function onClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const source = evt.target.dataset.source;
  const alt = evt.target.alt;

  instanceCreat(source, alt);
}

function instanceCreat(src, alt) {
  const imgModal = basicLightbox.create(`<div class="bg">
    <img
        class="gallery__image"
        src="${src}"
        alt="${alt}"
    /></div>`);
  imgModal.show();

  document.addEventListener("keydown", closeModalEsc);
  function closeModalEsc(e) {
    if (e.code === "Escape") {
      imgModal.close();
      document.removeEventListener("keydown", closeModalEsc);
    }
  }
}
