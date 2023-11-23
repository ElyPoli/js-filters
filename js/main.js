"use strict";

// Dichiarazioni
const imgUpload = document.querySelector(".upload-box"); // label del pulsante
const urlInputImg = document.getElementById("url-input-img");
const errorMessage = document.querySelector(".error-message");

// L'utente seleziona un file
urlInputImg.addEventListener("change", function () {
  // Modifico le classi del label del pulsante
  imgUpload.classList.add("upload-box-small");

  // Recupero l'elemento dall'html, rimuovo la classe che lo rende non visibile
  const imgPreviewBox = document.querySelector(".img-preview-box");
  const imgPreview = document.querySelector(".img-preview");
  imgPreviewBox.classList.remove("d-none");

  // Verifico se l'utente ha selezionato un file immagine se no restituisco un errore
  const acceptedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
  ];
  const fileType = urlInputImg.files[0].type;
  if (acceptedImageTypes.includes(fileType)) {
    errorMessage.textContent = "";
    errorMessage.classList.add("d-none");
    imgPreview.classList.remove("d-none");
  } else {
    errorMessage.classList.remove("d-none");
    errorMessage.textContent = "Errore: Il file selezionato non è un'immagine.";
    imgPreview.classList.add("d-none"); // nascondo l'input file
    return;
  }

  // Creo un nuovo oggetto con il metodo "URL" utilizzando createObjectURL
  let fileUrl = URL.createObjectURL(urlInputImg.files[0]);
  imgPreview.src = fileUrl; // aggiungo l'url all'elemento html

  // Recupero il box relativo e faccio apparire gli input dei filtri
  const filtersBox = document.querySelector(".filters-box");
  filtersBox.classList.remove("d-none");
  filtersBox.innerHTML = `
      <div>
        <label for="grayscale" class="form-label">Grayscale</label>
        <input type="range" class="form-range my-filter-input" min="0" max="100" step="0.5" value="50" id="grayscale">
      </div>
      <div>
        <label for="saturate" class="form-label">Saturate</label>
        <input type="range" class="form-range my-filter-input" min="0" max="200" step="0.5" value="0" id="saturate">
      </div>
      <div>
        <label for="sepia" class="form-label">Sepia</label>
        <input type="range" class="form-range my-filter-input" min="0" max="100" step="0.5" value="0" id="sepia">
      </div>
      <div>
        <label for="invert" class="form-label">Invert</label>
        <input type="range" class="form-range my-filter-input" min="0" max="100" step="0.5" value="0" id="invert">
      </div>
      <div>
        <label for="contrast" class="form-label">Contrast</label>
        <input type="range" class="form-range my-filter-input" min="0" max="200" step="0.5" value="0" id="contrast">
      </div>
      <div>
        <label for="brightness" class="form-label">Brightness</label>
        <input type="range" class="form-range my-filter-input" min="0" max="200" step="0.5" value="0" id="brightness">
      </div>
      <div>
        <label for="blur" class="form-label">Blur</label>
        <input type="number" id="blur" min="0" max="10" value="0" class="form-control form-control-sm my-filter-input">
      </div>
      <div>
        <label for="hue-rotate" class="form-label">Hue Rotate</label>
        <input type="number" id="hue-rotate" min="0" max="360" value="0" class="form-control form-control-sm my-filter-input">
      </div>
  `;

  // Creo un array con tutti gli input dei filtri
  const myFiltersInputArray = document.querySelectorAll(".my-filter-input");

  // Ciclo e aggiungo un eventlistener per recuperare ogni volta l'input di ciascun filtro
  myFiltersInputArray.forEach((filter, i) => {
    filter.addEventListener("input", function () {
      // Ottengo il valore del filtro selezionato
      let filterInput = filter.value;

      // Creo un array con le varie unità di misuara da abbinare ai filtri
      const unitOfMeasure = ["%", "%", "%", "%", "%", "%", "px", "deg"];

      // Aggiorna lo stile del filtro selezionato
      imgPreview.style.filter = `${filter.id}(${filterInput}${unitOfMeasure[i]})`;
    });
  });
});
