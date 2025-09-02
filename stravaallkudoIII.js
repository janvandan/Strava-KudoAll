// ==UserScript==
// @name           Jan Strava Kudo (Version Clean Code avec bouton spinner)
// @namespace      https://github.com/janvandan
// @description    Gère les kudos sur Strava
// @include        https://www.strava.com/dashboard
// @grant          none
// ==/UserScript==

(function() {
    // ===== CONSTANTES =====
    const DEBUG_MODE = 2;
    const SCRIPT_NAME = 'Jan Strava Kudo';
    const ID_KUDO_FLAG = 'unfilled_kudos';
    const ID_FINAL_CLASS_SELECTOR = '.f5jBr.JlaW0';
    const ID_END_PAGE_CLASS_SELECTOR = '.MIt1i';
    const ID_CONTAINER_FOR_BUTTON = 'container-nav';
    const SCROLL_DELAY_MS = 3000;
    const KUDO_DELAY_MS = 300;
    const INIT_DELAY_MS = 2000;
    const MAX_SCROLL_ATTEMPTS = 10;
    let scrollAttemptsMax = 0;
    let kudoButton;
    let spinner;

    // ===== STYLES =====
    /**
     * Injecte le style CSS pour le spinner et le bouton.
     */
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #myKudobutton {
                padding: 8px 16px;
                background-color: #fc5200;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                position: fixed;
                top: 70px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 1000;
            }

            #kudo-spinner {
                display: none;
                position: fixed;
                top: 70px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 1001;
                width: 30px;
                height: 30px;
                border: 3px solid rgba(252, 82, 0, 0.3);
                border-radius: 50%;
                border-top-color: #fc5200;
                animation: spin 1s ease-in-out infinite;
            }

            @keyframes spin {
                to { transform: translateX(-50%) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== FONCTIONS CORE =====
    /**
     * Crée le bouton avec le style initial.
     */
    function createActionButton() {
        const button = document.createElement('input');
        button.id = 'myKudobutton';
        button.type = 'button';
        button.value = 'Give kudo to ALL';
        return button;
    }

    /**
     * Crée le spinner de chargement.
     */
    function createSpinner() {
        const spinnerElement = document.createElement('div');
        spinnerElement.id = 'kudo-spinner';
        return spinnerElement;
    }

    /**
     * Trouve le conteneur pour le bouton.
     */
    function findButtonContainer() {
        return document.getElementById(ID_CONTAINER_FOR_BUTTON);
    }

    /**
     * Initialise le bouton et le spinner.
     */
    function initButton() {
        injectStyles(); // Injecte les styles CSS

        const container = findButtonContainer();
        if (!container) {
            logError(`Impossible de trouver le conteneur '${ID_CONTAINER_FOR_BUTTON}'.`);
            document.body.appendChild(createActionButton());
            document.body.appendChild(createSpinner());
        } else {
            container.appendChild(createActionButton());
            container.appendChild(createSpinner());
        }

        kudoButton = document.getElementById('myKudobutton');
        spinner = document.getElementById('kudo-spinner');
        kudoButton.addEventListener('click', handleButtonClick);
        logDebug('Bouton et spinner initialisés avec succès.');
    }

    // ===== GESTION DU SCROLL =====
    /**
     * Scrolle jusqu'à la fin du fil d'activités.
     * @returns {Promise<boolean>} True si la classe finale est trouvée.
     */
    function scrollToEnd() {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                scrollAttemptsMax++;
                const finalMarker = document.querySelector(ID_FINAL_CLASS_SELECTOR);

                if (finalMarker) {
                    clearInterval(interval);
                    logDebug('Classe finale trouvée.');
                    stopSpinner();
                    setTimeout(() => removeButtonAndSpinner(), 1000);
                    resolve(true);
                } else if (scrollAttemptsMax >= MAX_SCROLL_ATTEMPTS) {
                    clearInterval(interval);
                    stopSpinner();
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
     * Scrolle vers le marqueur de fin actuel.
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

    // ===== GESTION DE L'INTERFACE =====
    function hideButton() {
        if (kudoButton) kudoButton.style.display = 'none';
    }

    function showButton() {
        if (kudoButton) kudoButton.style.display = 'block';
    }

    function startSpinner() {
        if (spinner) {
            spinner.style.display = 'block';
        }
    }

    function stopSpinner() {
        if (spinner) {
            spinner.style.display = 'none';
        }
    }

    function removeButtonAndSpinner() {
        if (kudoButton && kudoButton.parentNode) {
            kudoButton.parentNode.removeChild(kudoButton);
        }
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    }

    // ===== HANDLERS =====
    async function handleButtonClick() {
        logDebug('Début du traitement.');
        hideButton();
        startSpinner(); // Affiche le spinner

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
