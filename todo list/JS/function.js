//====================[NOUVELLE TACHE]====================//
function nouvelleTache(key) {
  if (key.keyCode == 13 || isNaN(key.keyCode)) {
    console.clear();
    ajoutElements();
    classement();
    rafraichissement();
    sauvegardeLocale();
  }
}
//--------------------(nouvelle tache)--------------------//

//====================[AJOUT D'ELEMENTS]====================//
function ajoutElements() {
  arrayListe.push({index: arrayListe.length, value: INPUT_TACHE.value, etat: "à faire", important: "false"});
  if(!(isNaN(parseInt(INPUT_ORDRE.value))))arrayListe[arrayListe.length-1].index = parseInt(INPUT_ORDRE.value-2);
}
//--------------------(ajout d'elements)--------------------//

//====================[CLASSEMENT]====================//
function classement() {
  for (var i = 0; i < arrayListe.length; i++) {
    for (var j= 0; j < arrayListe.length-1; j++) {
      if (arrayListe[j].index > arrayListe[j+1].index) {
        var temp = arrayListe[j];
        arrayListe[j] = arrayListe[j+1];
        arrayListe[j+1] = temp;
      }
    }
  }
  if(arrayListe.length > 0)arrayListe[0].index = 0;
  for (var i = 0; i < arrayListe.length-1; i++) {
    arrayListe[i+1].index -= arrayListe[i+1].index - arrayListe[i].index - 1;
  }
}
//--------------------(classement)--------------------//

//====================[RAFRAICHISSEMENT]====================//
function rafraichissement() {
  while (UL_PRINCIPAL.firstChild) {
    UL_PRINCIPAL.removeChild(UL_PRINCIPAL.firstChild);
  }
  for (var i = 0; i < arrayListe.length; i++) {
    li_tache = document.createElement("li");
    ajoutIndex(i);
    ajoutLibelle(i);
    ajoutImportant(i);
    if(arrayListe[i].important == "true") li_tache.childNodes[1].setAttribute("important", "true");
    else li_tache.childNodes[1].setAttribute("important", "false");
    ajoutEtat(i);
    if(arrayListe[i].etat == "à faire") li_tache.childNodes[1].setAttribute("etat", "à faire");
    else if(arrayListe[i].etat == "en cours") li_tache.childNodes[1].setAttribute("etat", "en cours");
    else li_tache.childNodes[1].setAttribute("etat", "fait");
    ajoutSupprimer();
    UL_PRINCIPAL.appendChild(li_tache);
  }
  INPUT_ORDRE.placeholder=arrayListe.length+1;
  INPUT_ORDRE.value="";
  INPUT_TACHE.value="";
}
//--------------------(rafraichissement)--------------------//

//====================[AJOUT DE L'INDEX]====================//
function ajoutIndex(i) {
  input_index = document.createElement("input");
  input_index.setAttribute("value", "");
  input_index.setAttribute("placeholder", i+1);
  li_tache.appendChild(input_index);
  input_index.addEventListener("keypress", changeOrdre);
}
//--------------------(ajout de l'index)--------------------//

//====================[AJOUT DU LIBELLE]====================//
function ajoutLibelle(i) {
  input_libelle = document.createElement("input");
  input_libelle.setAttribute("value", arrayListe[i].value);
  li_tache.appendChild(input_libelle);
}
//--------------------(ajout du libelle)--------------------//

//====================[CHANGEMENT D'ORDRE]====================//
function changeOrdre(key) {
  if (key.keyCode == 13) {
    arrayListe[nbrAine(this.parentNode)].index = parseInt(this.value)-2;
    classement();
    rafraichissement();
    sauvegardeLocale();
  }
}
//--------------------(changement d'ordre)--------------------//

//====================[AJOUT DE L'IMPORTANCE]====================//
function ajoutImportant(i) {
  button_important = document.createElement("button");
  button_important.setAttribute("name", "important");
  if(arrayListe[i].important == "false")button_important.innerHTML = "Rendre important";
  else button_important.innerHTML = "En fait ça va.";
  button_important.addEventListener("click", toggleAttribute);
  li_tache.appendChild(button_important);
}
//--------------------(ajout de l'importance)--------------------//

//====================[AJOUT LA PROGRESSION]====================//
function ajoutEtat(i) {
  button_etat = document.createElement("button");
  button_etat.setAttribute("name", "etat");
  if(arrayListe[i].etat == "à faire")button_etat.innerHTML = "Commencer...";
  else if(arrayListe[i].etat == "en cours")button_etat.innerHTML = "I did it!";
  else if(arrayListe[i].etat == "fait")button_etat.innerHTML = "Oops, j'avais pas vu ça.";
  button_etat.addEventListener("click", toggleAttribute);
  li_tache.appendChild(button_etat);
}
//--------------------(ajout la progression)--------------------//

//====================[AJOUT/RETRAIT D'ATTRIBUTS]====================//
function toggleAttribute() {
  switch(this.getAttribute("name")) {
    case "important":
      if(arrayListe[nbrAine(this.parentNode)].important == "false") arrayListe[nbrAine(this.parentNode)].important = "true";
      else arrayListe[nbrAine(this.parentNode)].important = "false";
      break;
    case "etat":
      if(arrayListe[nbrAine(this.parentNode)].etat == "à faire") arrayListe[nbrAine(this.parentNode)].etat = "en cours";
      else if(arrayListe[nbrAine(this.parentNode)].etat == "en cours") arrayListe[nbrAine(this.parentNode)].etat = "fait";
      else arrayListe[nbrAine(this.parentNode)].etat = "à faire";
      break;
  }
  rafraichissement();
  sauvegardeLocale();
  console.log(arrayListe);
}
//--------------------(ajout/retrait d'attributs)--------------------//

//====================[AJOUT DE LA SUPPRESSION]====================//
function ajoutSupprimer() {
  button_supprimer = document.createElement("button");
  button_supprimer.innerHTML = "ANNIHILER!!!";
  button_supprimer.addEventListener("click", supprimer);
  li_tache.appendChild(button_supprimer);
}
//--------------------(ajout de la suppression)--------------------//

//====================[SUPPRESSION]====================//
function supprimer() {
  arrayListe.splice(nbrAine(this.parentNode), 1);
  this.parentNode.remove();
  classement();
  rafraichissement();
  sauvegardeLocale();
}
//--------------------(suppression)--------------------//

//====================[NOMBRES D'AINE]====================//
function nbrAine(cadet) {
  c = 0;
  if (cadet.previousSibling != null) {
    nbrAine(cadet.previousSibling);
    c++;
  }
  return c;
}
//--------------------(nombres d'aine)--------------------//

//====================[SAUVEGARDE LOCALE]====================//
function sauvegardeLocale() {
  strListe = JSON.stringify(arrayListe);
  localStorage.setItem("Liste", strListe);
}
//--------------------(sauvegarde locale)--------------------//

//====================[CHARGEMENT LOCALE]====================//
function chargementLocale() {
  strListe = localStorage.getItem("Liste");
  if(strListe) arrayListe = JSON.parse(strListe);
  else arrayListe = [];
  console.log(arrayListe);
}
//--------------------(chargement locale)--------------------//
