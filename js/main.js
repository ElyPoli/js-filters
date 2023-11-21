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
  const imgPreview = document.querySelector(".img-preview");
  imgPreview.classList.remove("d-none");
  imgPreview.src = fileUrl;
});
