//====================[NOUVELLE LISTE]====================//
function nouvelleListe() {
	alert("Bonjour, je ne sert à rien !")
}
//--------------------(nouvelle liste)--------------------//

//====================[NOUVELLE TACHE]====================//
function nouvelleTache(key) {
  if (key.keyCode == 13 && INPUT_TACHE.value != "" || isNaN(key.keyCode)) { //Seule la touche "enter" ou un événement non-clavier (sourie) éxécute la fonction
    ajoutElements();
    classement();
    rafraichissementListe();
    sauvegardeLocale(true);
  }
}
//--------------------(nouvelle tache)--------------------//

//====================[AJOUT D'ELEMENTS]====================//
function ajoutElements() {
  arrayListe.push({index: arrayListe.length, value: INPUT_TACHE.value, etat: "à faire", important: "false"}); //On met l'objet à la fin du tableau
  if(!(isNaN(parseInt(INPUT_ORDRE.value))))arrayListe[arrayListe.length-1].index = parseInt(INPUT_ORDRE.value-2); //Si une valeur numérique a été inscrite dans INPUT_ORDRE on l'affecte à la valeur "index" de l'objet
}
//--------------------(ajout d'elements)--------------------//

//====================[CLASSEMENT]====================//
function classement() {
  for (var i = 0; i < arrayListe.length; i++) { //On parcourt le tableau autant de choix que ça taille pour décaller les éléments dans le désordre 1 par 1
    for (var j= 0; j < arrayListe.length-1; j++) {
      if (arrayListe[j].index > arrayListe[j+1].index) { //Si la première valeur est plus haute que la deuxiéme on les inverses
        var temp = arrayListe[j];
        arrayListe[j] = arrayListe[j+1];
        arrayListe[j+1] = temp;
      }
    }
  }
  if(arrayListe.length > 0)arrayListe[0].index = 0; //Le premier objet est toujours à 0
  for (var i = 0; i < arrayListe.length-1; i++) { //On met une différence de 1 entre chaque index consécutif
    arrayListe[i+1].index -= arrayListe[i+1].index - arrayListe[i].index - 1;
  }
}
//--------------------(classement)--------------------//

//====================[RAFRAICHISSEMENT]====================//
function rafraichissementListe() { //On utilise le tableau pour affiche la liste
  while (UL_PRINCIPAL.firstChild) { //On supprime la liste tant qu'il reste un élément de liste
    UL_PRINCIPAL.removeChild(UL_PRINCIPAL.firstChild);
  }
  for (var i = 0; i < arrayListe.length; i++) {
    li_tache = document.createElement("li");
    ajoutIndex(i);
    ajoutLibelle(i);
    ajoutImportant(i);
    ajoutEtat(i);
    ajoutSupprimer();
    UL_PRINCIPAL.appendChild(li_tache);
  }
  INPUT_ORDRE.placeholder=arrayListe.length+1; //On affiche le prochain index dans le placeholder
  INPUT_ORDRE.value=""; //On vide les zones de saisie
  INPUT_TACHE.value="";
}
//--------------------(rafraichissement)--------------------//

//====================[AJOUT DE L'INDEX]====================//
function ajoutIndex(i) {
  input_index = document.createElement("input");
  input_index.setAttribute("placeholder", i+1); //On affiche le numéro d'index
  input_index.setAttribute("value", ""); //Et on laisse le champ vide pour l'éditer plus vite
  li_tache.appendChild(input_index);
  input_index.addEventListener("keypress", changeOrdre); //Lorsqu'on appuie sur une touche (enter) on actualise le tableau
}
//--------------------(ajout de l'index)--------------------//

//====================[CHANGEMENT D'ORDRE]====================//
function changeOrdre(key) {
  if (key.keyCode == 13) { //Si il s'agit bien de la touche (enter)
  	console.log(this.value+" | "+(nbrAine(this.parentNode)-1));
    if(this.value == nbrAine(this.parentNode) || this.value == (nbrAine(this.parentNode)-1)) this.value-=2; //Gestion de bug bidouillé
    arrayListe[nbrAine(this.parentNode)].index = parseInt(this.value);
    classement();
    rafraichissementListe();
    sauvegardeLocale(true);
  }
}
//--------------------(changement d'ordre)--------------------//

//====================[AJOUT DU LIBELLE]====================//
function ajoutLibelle(i) {
  input_libelle = document.createElement("input");
  input_libelle.setAttribute("value", arrayListe[i].value); //On met l'objet value dans l'attribut value
  input_libelle.addEventListener("keypress", changeLibelle);
  input_libelle.addEventListener("blur", changeLibelle);
  li_tache.appendChild(input_libelle);
}
//--------------------(ajout du libelle)--------------------//

//====================[CHANGEMENT DE LIBELLE]====================//
function changeLibelle(key) {
  if (key.keyCode == 13) { //Si il s'agit bien de la touche (enter)
    arrayListe[nbrAine(this.parentNode)].value = this.value;
    sauvegardeLocale(true);
  }
}
//--------------------(changement de libelle)--------------------//

//====================[AJOUT DE L'IMPORTANCE]====================//
function ajoutImportant(i) {
  button_important = document.createElement("button");
  button_important.setAttribute("name", "important");
  if(arrayListe[i].important == "false")button_important.innerHTML = '<img src="IMG/important_grey.png" alt="pas trop important" height="25px"/>';
  else button_important.innerHTML = '<img src="IMG/important_red.png" alt="important" height="25px"/>';
  button_important.addEventListener("click", toggleAttribute);
  li_tache.appendChild(button_important);
  if(arrayListe[i].important == "true") li_tache.childNodes[1].setAttribute("important", "true");
  else li_tache.childNodes[1].setAttribute("important", "false");
}
//--------------------(ajout de l'importance)--------------------//

//====================[AJOUT LA PROGRESSION]====================//
function ajoutEtat(i) {
  button_etat = document.createElement("button");
  button_etat.setAttribute("name", "etat");
  if(arrayListe[i].etat == "à faire")button_etat.innerHTML = '<img src="IMG/zzz.png" alt="faire" height="25px"/>';
  else if(arrayListe[i].etat == "en cours")button_etat.innerHTML = '<img src="IMG/work.png" alt="finir" height="25px"/>';
  else if(arrayListe[i].etat == "fait")button_etat.innerHTML = '<img src="IMG/check.png" alt="refaire" height="25px"/>';
  button_etat.addEventListener("click", toggleAttribute);
  li_tache.appendChild(button_etat);
  if(arrayListe[i].etat == "à faire") li_tache.childNodes[1].setAttribute("etat", "à faire");
  else if(arrayListe[i].etat == "en cours") li_tache.childNodes[1].setAttribute("etat", "en cours");
  else li_tache.childNodes[1].setAttribute("etat", "fait");
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
  rafraichissementListe();
  sauvegardeLocale(false);
}
//--------------------(ajout/retrait d'attributs)--------------------//

//====================[AJOUT DE LA SUPPRESSION]====================//
function ajoutSupprimer() {
  button_supprimer = document.createElement("button");
  button_supprimer.innerHTML = '<img src="IMG/trash.png" alt="supprimer" height="25px"/>';
  button_supprimer.addEventListener("click", supprimer);
  li_tache.appendChild(button_supprimer);
}
//--------------------(ajout de la suppression)--------------------//

//====================[SUPPRESSION]====================//
function supprimer() {
  arrayListe.splice(nbrAine(this.parentNode), 1);
  this.parentNode.remove();
  classement();
  rafraichissementListe();
  sauvegardeLocale(true);
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
function sauvegardeLocale(push) {
  strListe = JSON.stringify(arrayListe);
  localStorage.setItem("Liste", strListe);
  if(push)ctrl_z.push(JSON.parse(JSON.stringify(arrayListe)));
}
//--------------------(sauvegarde locale)--------------------//

//====================[CHARGEMENT LOCALE]====================//
function chargementLocale() {
  strListe = localStorage.getItem("Liste");
  if(strListe) arrayListe = JSON.parse(strListe);
  else arrayListe = [];
  ctrl_z.push(JSON.parse(JSON.stringify(arrayListe)));
}
//--------------------(chargement locale)--------------------//

//====================[SUPPRESSION TOTALE]====================//
function supprimerTous() {
  arrayListe = [];
  rafraichissementListe();
  sauvegardeLocale(true);
}
//--------------------(suppression totale)--------------------//

//====================[RETOUR ARRIERE]====================//
function undo() {
  if (ctrl_z.length > 1) {
    ctrl_z.splice(ctrl_z.length-1, 1);
    arrayListe = ctrl_z[ctrl_z.length-1];
    rafraichissementListe();
    sauvegardeLocale(false);
  }
}
//--------------------(retour arriere)--------------------//
