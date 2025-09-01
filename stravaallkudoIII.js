// ==UserScript==
// @name           Jan Strava Kudo (Clean Code)
// @namespace      https://github.com/janvandan
// @description    Gère les kudos sur Strava avec une approche Clean Code
// @include        https://www.strava.com/dashboard
// @grant          none
// ==/UserScript==

(function() {
    // ===== CONSTANTES =====
    const DEBUG_MODE = 2;
    const SCRIPT_NAME = 'Jan Strava Kudo (Clean Code)';
    const ID_KUDO_FLAG = 'unfilled_kudos';
    const ID_FINAL_CLASS_SELECTOR = '.f5jBr.JlaW0';
    const ID_END_PAGE_CLASS_SELECTOR = '.MIt1i';
    const ID_CONTAINER_FOR_BUTTON = 'container-nav';
    const SCROLL_DELAY_MS = 3000;
    const KUDO_DELAY_MS = 300;
    const INIT_DELAY_MS = 2000;
    const MAX_SCROLL_ATTEMPTS = 10;

    // ===== ÉTAT =====
    let scrollAttemptsMax = 0;
    let kudoButton;

    // ===== FONCTIONS CORE =====
    /**
     * Crée et initialise le bouton d'action.
     */
    function createActionButton() {
        const button = document.createElement('input');
        button.id = 'myKudobutton';
        button.type = 'button';
        button.value = 'Give kudo to ALL';
        return button;
    }

    /**
     * Trouve le conteneur pour le bouton.
     * @returns {HTMLElement|null} Le conteneur ou null s'il n'est pas trouvé.
     */
    function findButtonContainer() {
        return document.getElementById(ID_CONTAINER_FOR_BUTTON);
    }

    /**
     * Initialise le bouton et son écouteur d'événement.
     */
    function initButton() {
        const container = findButtonContainer();
        if (!container) {
            logError(`Impossible de trouver le conteneur '${ID_CONTAINER_FOR_BUTTON}'.`);
            return;
        }

        kudoButton = createActionButton();
        container.appendChild(kudoButton);
        kudoButton.addEventListener('click', handleButtonClick);
        logDebug('Bouton initialisé avec succès.');
    }

    // ===== GESTION DU SCROLL =====
    /**
     * Scrolle jusqu'à la fin du fil d'activités.
     * @returns {Promise<boolean>} True si la classe finale est trouvée, false sinon.
     */
    async function scrollToEnd() {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                scrollAttemptsMax++;
                const finalMarker = document.querySelector(ID_FINAL_CLASS_SELECTOR);

                if (finalMarker) {
                    clearInterval(interval);
                    logDebug('Classe finale trouvée.');
                    hideButton();
                    setTimeout(() => removeButton(), 1000);
                    resolve(true);
                } else if (scrollAttemptsMax >= MAX_SCROLL_ATTEMPTS) {
                    clearInterval(interval);
                    showButton();
                    logDebug(`Classe finale introuvable après ${MAX_SCROLL_ATTEMPTS} tentatives.`);
                    resolve(false);
                } else {
                    scrollToEndMarker();
                }
            }, SCROLL_DELAY_MS);
        });
    }

    /**
     * Scrolle jusqu'au marqueur de fin actuel.
     */
    function scrollToEndMarker() {
        const endMarker = document.querySelector(ID_END_PAGE_CLASS_SELECTOR);
        if (endMarker) {
            endMarker.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.dispatchEvent(new Event('scroll'));
            logDebug(`Scroll vers ${ID_END_PAGE_CLASS_SELECTOR} (tentative ${scrollAttemptsMax}/${MAX_SCROLL_ATTEMPTS}).`);
        }
    }

    // ===== GESTION DES KUDOS =====
    /**
     * Donne un kudo à toutes les activités éligibles.
     */
    function giveKudos2All() {
        const kudoButtons = Array.from(document.querySelectorAll(`svg[data-testid='${ID_KUDO_FLAG}']`));
        logDebug(`Trouvé ${kudoButtons.length} activités sans kudo.`);

        kudoButtons.forEach((button, index) => {
            setTimeout(() => {
                const kudoButton = button.closest('button');
                if (kudoButton) {
                    kudoButton.click();
                    logDebug(`Kudo donné à l'activité ${index}.`);
                }
            }, index * KUDO_DELAY_MS);
        });
    }

    // ===== GESTION DU BOUTON =====
    function hideButton() {
        if (kudoButton) kudoButton.style.display = 'none';
    }

    function showButton() {
        if (kudoButton) kudoButton.style.display = 'inline';
    }

    function removeButton() {
        if (kudoButton && kudoButton.parentNode) {
            kudoButton.parentNode.removeChild(kudoButton);
        }
    }

    // ===== HANDLERS =====
    async function handleButtonClick() {
        logDebug('Début du traitement.');
        hideButton();
        const isEndReached = await scrollToEnd();

        if (isEndReached) {
            giveKudos2All();
        }

        logDebug('Fin du traitement.');
    }

    // ===== UTILITAIRES =====
    function logDebug(message) {
        if (DEBUG_MODE > 1) console.log(`[${SCRIPT_NAME}] ${message}`);
    }

    function logError(message) {
        console.error(`[${SCRIPT_NAME}] ${message}`);
    }

    // ===== INITIALISATION =====
    function init() {
        logDebug('Initialisation du script.');
        setTimeout(initButton, INIT_DELAY_MS);
    }

    // ===== DÉMARRAGE =====
    try {
        init();
    } catch (error) {
        alert(`Erreur dans le script : ${error.message}`);
    }
})();
