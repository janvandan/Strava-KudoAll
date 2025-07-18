// ==UserScript==
// @name           Jan Strava kudo II...
// @namespace      https://github.com/janvandan
// @description    Met des kudos sur la page en cours
// @include        https://www.strava.com/dashboard
// ==/UserScript==

(function () {
  
	var debug = 2;
	var nameJavaScript = 'Jan Strava kudo II...';
	var inputButton = document.createElement('input');
	var pageActivite = 1;
  
	// <button class="Button--btn--1UWRP Button--default--33OIF KudosAndComments--social-button--1QAOS" type="button" title="Afficher tous les kudos" data-testid="kudos_button">
	// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-testid="unfilled_kudos" height="16" width="16">
  
	var flagKudoToBeDone = 'unfilled_kudos';
  
	/* giveKudo2all : list every Kudo "ToBeDone" (flag with the tag flagKudoToBeDone and click on the associated button */
	
	function giveKudo2all() {
    
		if ( debug > 1 ) { console.log(nameJavaScript + ".giveKudo2all : start"); }
  
		const kudosSVGButtons = Array.from(document.querySelectorAll("svg[data-testid='unfilled_kudos']"));
      	
		if ( debug > 1 ) { console.log(nameJavaScript + ".giveKudo2all : kudosButtons.length : " + kudosSVGButtons.length); }
  
		for (let i = 0; i < kudosSVGButtons.length; i++) {
    
			let thiskudoButtons = kudosSVGButtons[i].parentNode;
    	
			if ( debug > 1 ) { console.log(nameJavaScript + ".giveKudo2all : clickKudo[" + i + "] : " + thiskudoButtons.getAttribute('data-testid')); }
    
			thiskudoButtons.click();
		}
    
		if ( debug > 1 ) { console.log(nameJavaScript + ".giveKudo2all : end"); }
	}
  
	/* actionButton : actions started when the event click button is detected */
	
	function actionButton() {
    
		if ( debug > 1 ) { console.log(nameJavaScript + ".actionButton : start"); }

		if ( debug > 1 ) { console.log(nameJavaScript + ".actionButton : chargeMaxActivite"); }

		chargeMaxActivite();

		if ( debug > 1 ) { console.log(nameJavaScript + ".actionButton : giveKudo2all"); }
    
		// giveKudo2all();
    
		if ( debug > 1 ) { console.log(nameJavaScript + ".actionButton : end"); }
	}
  
	/* initInput : create an input's button on the strava dashboard page, on the left just at the end of the profile square */
	
	function initInput() {
    
		if ( debug > 1 ) { console.log(nameJavaScript + ".initInput : start"); }
    
		/* before 26/10/2023, display on child element athlete-profile, on the top left screen
  			const divFormybutton = document.getElementById('athlete-profile');
     			since 26/10/2023 display on top center of the screen via container-nav
		*/
		
		const divFormybutton = document.getElementById('container-nav');
		// const inputButton = document.createElement('input');
    
		divFormybutton.appendChild(inputButton);
    
		inputButton.id="myKudobutton";
		inputButton.type="button";
		inputButton.value="Give kudo to ALL n" + pageActivite;
		
		// inputButton.setAttribute("style", "font-family:-apple-system;font-size:16px;position:absolute;top:100px;right:40px;");
  
		inputButton.addEventListener('click', actionButton, true);
    
		if ( debug > 1 ) { console.log(nameJavaScript + ".initInput : end"); }
	}

	function chargeMaxActivite() {

		if ( debug > 1 ) { console.log(nameJavaScript + ".chargeMaxActivite : start"); }

		// La derniere class affichee par strava lorsqu'on au bout du bout du scroll est egale a "f5jBr JlaW0"

		let tagTestFinAffichageActivites = document.getElementsByClassName("f5jBr JlaW0");
		let tagDernierActiviteDeLaPage;

		let lastDiv = document.getElementsByClassName("MIt1i")[0]; // class "MIt1i", dernier div de bas de page
		let lastDivPrevSibling = lastDiv.previousElementSibling; // recup de la derniere activite avant "MIt1i"
		let idActiviteActive = lastDivPrevSibling.getElementsByClassName("CQdSY")[0].id; // recup de l'id de la derniere activite
		let idActiviteNext = idActiviteActive;

		if ( debug > 1 ) { console.log(nameJavaScript + ".chargeMaxActivite : tagTestFinAffichageActivites.length = " + tagTestFinAffichageActivites.length); }

		if ( tagTestFinAffichageActivites.length === 0) {

			if ( debug > 1 ) { console.log(nameJavaScript + ".chargeMaxActivite : Reste des activités a afficher."); }

			inputButton.parentElement.remove();

			// La derniere class de la derniere activité affichee dans la page par strava est egale a "f5jBr"
			
			tagDernierActiviteDeLaPage = document.getElementsByClassName("f5jBr");

			window.scrollTo({
			//	top: document.body.scrollHeight,
				top: tagDernierActiviteDeLaPage[0].offsetTop,
				behavior: 'smooth'
			});

			pageActivite += 1;
			inputButton.value="Give kudo to ALL n" + pageActivite;
			
			if ( idActiviteActive === idActiviteNext ) {
					
				lastDiv = document.getElementsByClassName("MIt1i")[0]; // class "MIt1i", dernier div de bas de page
				lastDivPrevSibling = lastDiv.previousElementSibling; // recup de la derniere activite avant "MIt1i"
				idActiviteNext = lastDivPrevSibling.getElementsByClassName("CQdSY")[0].id; // recup de l'id de la derniere activite

				if ( debug > 1 ) { console.log(nameJavaScript + ".chargeMaxActivite : (idActiviteActive, idActiviteNext) = (" + idActiviteActive + ", " + idActiviteNext + ")" ); }
			}

			tagTestFinAffichageActivites = document.getElementsByClassName("f5jBr JlaW0");

			if ( debug > 1 ) { console.log(nameJavaScript + ".chargeMaxActivite : tagTestFinAffichageActivites.length = " + tagTestFinAffichageActivites.length); }
		} else {
			if ( debug > 1 ) { console.log(nameJavaScript + ".chargeMaxActivite : Fin des activités a afficher."); }

			inputButton.value="Give kudo to ALL Fini";
		}

		if ( debug > 1 ) { console.log(nameJavaScript + ".chargeMaxActivite : end"); }
	}
  
	try {
    
		// Debut code
		
		if ( debug > 1 ) { console.log(nameJavaScript + ".main : debut execution code");}
  
		initInput();
	}

	catch (e) {
		alert("UserScript exception:\n" + e);
	}

	// Fin code
	if ( debug ) { console.log(nameJavaScript + ".main : fin execution code ");}
	
})();
