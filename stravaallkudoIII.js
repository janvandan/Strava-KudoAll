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
    let isScrolling = false;
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
        divFormybutton.appendChild(inputButton);
        inputButton.addEventListener('click', actionButton);
        if (debug > 1) console.log(nameJavaScript + ".initInput : end");
    }

    // Donne un kudo à toutes les activités sans kudo
    function giveKudo2all() {
        if (debug > 1) console.log(nameJavaScript + ".giveKudo2all : start");
        const kudosSVGButtons = Array.from(document.querySelectorAll(`svg[data-testid='${flagKudoToBeDone}']`));
        if (debug > 1) console.log(nameJavaScript + ".giveKudo2all : kudosButtons.length : " + kudosSVGButtons.length);
        kudosSVGButtons.forEach((button, index) => {
            setTimeout(() => {
                button.parentNode.click();
                if (debug > 1) console.log(nameJavaScript + ".giveKudo2all : kudo donné à l'activité " + index);
            }, index * 300); // Délai pour éviter le rate limiting
        });
        if (debug > 1) console.log(nameJavaScript + ".giveKudo2all : end");
    }

    // Scrolle jusqu'à la fin du fil
    function scrollToBottom() {
        if (debug > 1) console.log(nameJavaScript + ".scrollToBottom : start");
        return new Promise((resolve) => {
            let lastHeight = document.body.scrollHeight;
            const scrollInterval = setInterval(() => {
                window.scrollTo(0, document.body.scrollHeight);
                // Attend que de nouvelles activités soient chargées
                setTimeout(() => {
                    const newHeight = document.body.scrollHeight;
                    if (newHeight === lastHeight) {
                        clearInterval(scrollInterval);
                        resolve();
                    }
                    lastHeight = newHeight;
                }, 1000);
            }, 2000);
        });
    }

    // Action principale : scrolle puis donne les kudos
    async function actionButton() {
        if (debug > 1) console.log(nameJavaScript + ".actionButton : start");
        await scrollToBottom();
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
