//====================[CONSTANTE D'ADRESSE]====================//
var INPUT_INDEX = document.querySelector('#barreSaisie input[name="index"]');
var INPUT_TACHE = document.querySelector('#barreSaisie input[name="tache"]');
var BUTTON_GO = document.querySelector('#barreSaisie button');
//--------------------(constante d'adresse)--------------------//

function nouvelleTache(key) {
  if (key.keyCode == 13 || isNaN(key.keyCode)) {
    alert("wow");
  }
}

//====================[EVENEMENTS PRINCIPAUX]====================//
INPUT_TACHE.addEventListener("keypress", nouvelleTache);
BUTTON_GO.addEventListener("click", nouvelleTache);
//--------------------(evenements principaux)--------------------//
