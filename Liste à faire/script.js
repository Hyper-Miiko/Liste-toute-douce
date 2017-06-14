var clicValid = document.querySelector("#toDoList button"); //selection boutton validez
var strEndur = localStorage.getItem('endur');
if(strEndur) var endur = JSON.parse(strEndur);
else endur = [];

for (i=0; i<endur.length; i++) { //création li du tableau initial
  var formToDoList = document.getElementById("toDoList");
  var divLi = document.createElement("li");
  var inPrio = document.createElement("input");
  var inChamp = document.createElement("input");
  var butOK = document.createElement("button");
  var butRemove = document.createElement("button");

  inPrio.setAttribute("value", endur[i].index);
  inChamp.setAttribute("value", endur[i].value);
  butOK.innerHTML = "Ok";
  butRemove.innerHTML = "X";
  document.getElementById("liste").appendChild(divLi);
  divLi.appendChild(inPrio);
  divLi.appendChild(inChamp);
  divLi.appendChild(butOK);
  divLi.appendChild(butRemove);

  butOK.addEventListener("click", done);
  butRemove.addEventListener("click", del);
}
// fonction INSERT************************************************************/
function insert() { //ajout de li lorsqu'on clique sur validez
  var formToDoList = document.getElementById("toDoList");
  var divLi = document.createElement("li");
  var inPrio = document.createElement("input");
  var inChamp = document.createElement("input");
  var butOK = document.createElement("button");
  var butRemove = document.createElement("button");
  var recupPriorite = parseInt(formToDoList.priorite.value);
  var recupChampSaisie = formToDoList.champSaisie.value;

  endur[i] = {index: recupPriorite, value: recupChampSaisie, done: false, important: false};

  inPrio.setAttribute("value", endur[i].index);
  inChamp.setAttribute("value", endur[i].value);
  butOK.innerHTML = "Ok";
  butRemove.innerHTML = "X";
  document.getElementById("liste").appendChild(divLi);
  divLi.appendChild(inPrio);
  divLi.appendChild(inChamp);
  divLi.appendChild(butOK);
  divLi.appendChild(butRemove);

  butOK.addEventListener("click", done);
  butRemove.addEventListener("click", del);
  i++;
  classement();
}
// **************************************************************************/

// fonction DONE ************************************************************/
function done(){
  if(this.parentNode.childNodes[1].hasAttribute("done")) this.parentNode.childNodes[1].removeAttribute("done");
  else this.parentNode.childNodes[1].setAttribute("done", true);
}
// **************************************************************************/
function important(){
  if(this.parentNode.childNodes[1].hasAttribute("important")) this.parentNode.childNodes[1].removeAttribute("important");
  else this.parentNode.childNodes[1].setAttribute("important", true);
}

function brotherCount(brother) {
  if (brother.previousSibling != null) {
    brotherCount(brother.previousSibling);
    c++;
  }
}
// fonction DEL *************************************************************/
function del(){
  c = 0;
  brotherCount(this.parentNode);
  this.parentNode.remove();
  endur.splice(c-1, 1);
  if(i > 1)classement();
  i--;
}
// **************************************************************************/
function classement() {

  for(j=0; j < endur.length-1; j++) { //On parcourt le tableau plein de fois
    for(k=0; k < endur.length-1; k++) {
      if (endur[k].index == endur[k+1].index) { //Lorsque deux valeur à la suite sont égale
        endur[k+1].index--;
        for(l=k; l < endur.length; l++) { //Décaler les éléments suivant
          endur[l].index++;
        }
      }
      if (endur[k].index > endur[k+1].index) { //classer dans l'ordre croissanr
        temp = endur[k+1];
        endur[k+1] = endur[k];
        endur[k] = temp;
      }
    }
  }
  endur[0].index = 1;
  for(k=0; k < endur.length-1; k++) { //Réduire les différence à 1
    if (endur[k+1].index > endur[k].index+1) {
      endur[k+1].index -= endur[k+1].index-endur[k].index-1;
    }
  }

  for (j=1; j <= endur.length; j++) { //Editer les li pour les faire correspondre au tableau
    document.getElementById("liste").childNodes[j].childNodes[0].setAttribute("value", endur[j-1].index);
    document.getElementById("liste").childNodes[j].childNodes[1].setAttribute("value", endur[j-1].value);
    /*if(endur[j-1].done == true)document.getElementById("liste").childNodes[j].childNodes[1].setAttribute("done", "true");
    else document.getElementById("liste").childNodes[j].childNodes[1].removeAttribute("done");
    if(endur[j-1].important == true)document.getElementById("liste").childNodes[j].childNodes[1].setAttribute("important", "true");
    else document.getElementById("liste").childNodes[j].childNodes[1].removeAttribute("important");*/
  }
}

window.onkeyup = function key(touch) {
  if(touch.keyCode == 13) {
    for (j=0; j < endur.length; j++) {
      endur[j].index = document.getElementById("liste").childNodes[j+1].childNodes[0].value; //Mettre à l'index la valeur saisie
    }
    classement();
  }
}
/////
//
//
function save() {
  strEndur = JSON.stringify(endur);
  localStorage.setItem('endur',strEndur);
}

document.getElementById("save").addEventListener("click", save);


clicValid.addEventListener("click", insert);
