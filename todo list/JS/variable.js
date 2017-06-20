//====================[ADRESSES]====================//
var INPUT_ORDRE = document.querySelector('#barreSaisie input[name="ordre"]'); //Champ de saisie du positionnement
var INPUT_TACHE = document.querySelector('#barreSaisie input[name="tache"]'); //Champ de saisie du libellé
var BUTTON_GO = document.getElementById('Valider'); //Bouton de validation
var BUTTON_DESTROY = document.getElementById('DeleteAll'); //Bouton de suppression universelle
var BUTTON_UNDO = document.getElementById('undo'); //Bouton annuler
var BUTTON_ADD = document.getElementById('add'); //Bouton nouvelle liste
var UL_PRINCIPAL = document.querySelector('ul'); //Zone d'affichage des tâche à accomplir
//--------------------(adresses)--------------------//

var ctrl_z = new Array([],[]);
var nListe = 0;
