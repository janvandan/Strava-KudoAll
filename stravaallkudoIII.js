// ==UserScript==
// @name           Jan Strava kudo III (Amélioré avec Mistral)
// @namespace      https://github.com/janvandan
// @description    Met des kudos sur toutes les activités du fil Strava
// @include        https://www.strava.com/dashboard
// @grant          none
// ==/UserScript==

(function () {
    const debug = 2;
    const nameJavaScript = 'Jan Strava kudo III';
    const flagKudoToBeDone = 'unfilled_kudos';
    let pageActivite = 1;

    // Crée le bouton
    const inputButton = document.createElement('input');
    inputButton.id = "myKudobutton";
    inputButton.type = "button";
    inputButton.value = "Give kudo to ALL";

    // Initialise le bouton
    function initInput() {
        if (debug > 1) console.log(nameJavaScript + ".initInput : start");
        const divFormybutton = document.getElementById('container-nav');
        if (divFormybutton) {
            divFormybutton.appendChild(inputButton);
            inputButton.addEventListener('click', actionButton);
        } else {
            console.error(nameJavaScript + ".initInput : Impossible de trouver l'élément 'container-nav'.");
        }
        if (debug > 1) console.log(nameJavaScript + ".initInput : end");
    }

    // Donne un kudo à toutes les activités sans kudo
    function giveKudo2all() {
        if (debug > 1) console.log(nameJavaScript + ".giveKudo2all : start");
        const kudosSVGButtons = Array.from(document.querySelectorAll(`svg[data-testid='${flagKudoToBeDone}']`));
        if (debug > 1) console.log(nameJavaScript + ".giveKudo2all : kudosButtons.length : " + kudosSVGButtons.length);

        kudosSVGButtons.forEach((button, index) => {
            setTimeout(() => {
                const kudoButton = button.closest('button');
                if (kudoButton) {
                    kudoButton.click();
                    if (debug > 1) console.log(nameJavaScript + ".giveKudo2all : kudo donné à l'activité " + index);
                }
            }, index * 300); // Délai pour éviter le rate limiting
        });

        if (debug > 1) console.log(nameJavaScript + ".giveKudo2all : end");
    }

// Fonction pour scroller jusqu'à l'élément avec la classe "MIt1i"
function scrollToEndMarker() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            const endMarker = document.querySelector('.MIt1i');
            if (endMarker) {
                endMarker.scrollIntoView({ behavior: 'smooth', block: 'start' });
                clearInterval(checkInterval);

                // Attend un court instant pour laisser le temps au chargement dynamique
                setTimeout(() => {
                    resolve();
                }, 1000);
            }
        }, 500); // Vérifie toutes les 500 ms si l'élément est présent
    });
}

    // Action principale : scrolle puis donne les kudos
    async function actionButton() {
        if (debug > 1) console.log(nameJavaScript + ".actionButton : start");
        await scrollToEndMarker();
        giveKudo2all();
        if (debug > 1) console.log(nameJavaScript + ".actionButton : end");
    }

    // Initialisation
    try {
        if (debug > 1) console.log(nameJavaScript + ".main : début execution code");
        initInput();
    } catch (e) {
        alert("UserScript exception:\n" + e);
    }

    if (debug) console.log(nameJavaScript + ".main : fin execution code");
})();
