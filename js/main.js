"use strict";

// Dichiarazioni
const imgUpload = document.querySelector(".upload-box"); // label del pulsante
const urlInputImg = document.getElementById("url-input-img");

// L'utente seleziona un file
urlInputImg.addEventListener("change", function () {
  imgUpload.classList.add("d-none"); // Nascondo il label del pulsante

  // Creo un nuovo oggetto con il metodo "URL" utilizzando createObjectURL
  let fileUrl = URL.createObjectURL(urlInputImg.files[0]);

  // Recupero l'elemento dall'html, rimuovo la classe che lo rende non visibile e aggiungo l'url
  const imgPreviewBox = document.querySelector(".img-preview-box");
  const imgPreview = document.querySelector(".img-preview");
  imgPreviewBox.classList.remove("d-none");
  imgPreview.src = fileUrl;

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
  const myFilterInput = document.querySelectorAll(".my-filter-input");

  // Ciclo e aggiungo un eventlistener per recuperare ogni volta l'input di ciascun filtro
  myFilterInput.forEach((filter, i) => {
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