//====================[INITIALISATION]====================//
chargementLocale();
rafraichissementListe();
//--------------------(initialisation)--------------------//

//====================[EVENEMENTS PRINCIPAUX]====================//
BUTTON_ADD.addEventListener("click", nouvelleListe);
BUTTON_DESTROY.addEventListener("click", supprimerTous);
BUTTON_UNDO.addEventListener("click", undo);
BUTTON_GO.addEventListener("click", nouvelleTache); //Si on valide avec le boutton
INPUT_TACHE.addEventListener("keypress", nouvelleTache); //Ou en appuyant sur une touche (enter)
//--------------------(evenements principaux)--------------------//
