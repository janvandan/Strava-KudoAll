// ==UserScript==
// @name           Jan Strava kudo...
// @namespace      http://www.janvd.fr
// @description    Met des kudos sur la page en cours
// @include        https://www.strava.com/dashboard
// ==/UserScript==

(function () {
  
	var debug = 2;
	var nameJavaScript = 'Jan Strava kudo...';
  
  var flagKudoToBeDone = 'button.js-add-kudo';
  
  
  /*
  	giveKudo2all : list every Kudo "ToBeDone" (flag with the tag flagKudoToBeDone and click on the associated button
  */
	function giveKudo2all() {
    
    if ( debug > 1 ) { console.log(nameJavaScript + ".giveKudo2all : start"); }
  
		const kudosButtons = Array.from(document.querySelectorAll(flagKudoToBeDone));
      	
  	if ( debug > 1 ) { console.log(nameJavaScript + ".giveKudo2all : kudosButtons.length : " + kudosButtons.length); }
  
  	for (let i = 0; i < kudosButtons.length; i++) {
    
    	let thiskudoButtons = kudosButtons[i];
    	
      if ( debug > 1 ) { console.log(nameJavaScript + ".giveKudo2all : clickKudo : " + thiskudoButtons.getAttribute('data-entry')); }
    
    	thiskudoButtons.click();
  	}
    
    if ( debug > 1 ) { console.log(nameJavaScript + ".giveKudo2all : end"); }
	}
  
  /*
  	actionButton : actions started when the event click button is detected
  */
  function actionButton() {
    
    if ( debug > 1 ) { console.log(nameJavaScript + ".actionButton : start"); }
    
    giveKudo2all();
    
    if ( debug > 1 ) { console.log(nameJavaScript + ".actionButton : end"); }
  }
  
  /*
  	initInput : create an input's button on the strava dashboard page, on the left just at the end of the profile square
  */
  function initInput() {
    
    if ( debug > 1 ) { console.log(nameJavaScript + ".initInput : start"); }
    
    const divFormybutton = document.getElementById('athlete-profile');
    const inputButton = document.createElement('input');
    
    divFormybutton.appendChild(inputButton);
    
    inputButton.id="myKudobutton";
    inputButton.type="button";
    inputButton.value="Give kudo to ALL";
		
    // inputButton.setAttribute("style", "font-family:-apple-system;font-size:16px;position:absolute;top:100px;right:40px;");
  
    inputButton.addEventListener('click', actionButton, true);
    
    if ( debug > 1 ) { console.log(nameJavaScript + ".initInput : end"); }
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
