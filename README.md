# Strava-KudoAll / Give kudos to every event in your Strava feed / Automatic kudos on Strava

Simple java script to give kudos on all new activities on the current Strava web page (https://www.strava.com/dashboard/*)

Ajout d'un bouton sur la fenêtre strava pour mettre un kudo à l'ensemble de votre fil en une seule fois

Add a button on top of the strava page to give kudo to all activities of your friends in the full activities dynamically expose by strava

Must be connectet (log in) to www.strava.com/dashboard (or any www.strava/dashboard/*) before to run the script.

Could be use via an external launcher like Greasemonkey (https://fr.wikipedia.org/wiki/Greasemonkey).

  
**from 2025-09-03 : Current script to use : https://github.com/janvandan/Strava-KudoAll/blob/master/stravaallkudoIII.user.js**

  
# Installation

Sur Firefox ou Chrome, pour que le script soit exécutable quand tu vas sur strava il faut installer une extension, sinon tu es obligé de copier/coller le script (https://github.com/janvandan/Strava-KudoAll/blob/master/stravaallkudoIII.user.js) à chaque fois dans la Console des navigateurs.  

**Firefox** : j’utilise l’extension Greasemonkey : https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/ qui peut s’installer aussi par le menu ‘extension’ de Firefox (https://addons.mozilla.org/fr/firefox/addon/greasemonkey/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search) puis :
	1) Menu : Outils / Extensions et thèmes, puis ‘Extensions’)
	2) Rechercher ‘greasemonkey’ via l’outil de recherche ‘Découvrez davantage de modules’ en haut de la page
	3) Puis cliquer sur ‘Ajouter à Firefox’ avec l’option ‘Epingler dans la barre d’outil’ ou équivalent :)
	
Une foix l’extension installée, il faut ajouter le script (https://github.com/janvandan/Strava-KudoAll/blob/master/stravaallkudoIII.user.js) à Greasemonkey. En allant dans l’extension Greasemonkey (dans la barre des onglets en haut à droite via l’icône puzzle) choisir ‘Nouveau script’, puis copier coller (https://github.com/janvandan/Strava-KudoAll/blob/master/stravaallkudoIII.user.js) à la place des premières lignes proposées par défaut par Firefox. Ne pas oublier d’enregistrer en cliquant sur l’icône de la disquette en haut à gauche. 
Tout est prêt pour le premier test.

Se connecter sur strava dans un nouvel onglet Strava, quand la page ‘Tableau de bord’ a fini de se télécharger, normalement un bouton orange ‘Give kudo to ALL’ en orange en haut au milieu s’affiche (normalement, …). Reste à cliquer dessus. 

**Chrome** : j’ai testé l’extension Tampermonkey) : https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=fr, cliquer sur le bouton d’ajout pour l’installer.
A la fin de l’installation, normalement, on te demande d’autoriser les scripts utilisateur dans les ‘Détails’ de l’extension Tampermonkey ‘Autoriser les scripts utilisateur’.

Dans la fenêtre de l’extension cliquer sur le (+) pour ajouter un script. copier coller (https://github.com/janvandan/Strava-KudoAll/blob/master/stravaallkudoIII.user.js) à la place des premières lignes proposées par défaut par Chrome.

Tout est prêt pour le premier test.

Se connecter sur strava dans un nouvel onglet Strava, quand la page ‘Tableau de bord’ a fini de se télécharger, normalement un bouton orange ‘Give kudo to ALL’ en orange en haut au milieu s’affiche (normalement, …). Reste à cliquer dessus.


Archives :  
  
*from 2025-09-01 : Current script to use : https://github.com/janvandan/Strava-KudoAll/blob/master/stravaallkudoIII.js  
from 2021-08-10 : Current script to use : https://github.com/janvandan/Strava-KudoAll/blob/master/stravaallkudoII.js  
from 2019-08-20 to 2021-07-31 : stravaallkudo.js. Or, simply via the console, same as the "document.querySelectorAll('button.js-add-kudo').forEach(node => node.click());" line.*  
