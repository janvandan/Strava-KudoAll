var debug = 2;
var nameJavaScript = "Jan Strava kudo...";

try {
  // Debut code
  if ( debug > 1 ) { console.log(nameJavaScript + ".main : debut execution code");}

  const kudosButtons = Array.from(document.querySelectorAll('button.js-add-kudo'));
      	
  if ( debug > 1 ) { console.log(nameJavaScript + ".main : kudosButtons.length : " + kudosButtons.length); }
  
  // /html/body/div[3]/div/div[2]/div[2]/div[1]/div[1]/div[3]/div[1]/div[2]/button[1]
  // /html/body/div[3]/div/div[2]/div[2]/div[1]/div[2]/div[4]/div[1]/div[2]/button[1]
  
  for (let i = 0; i < kudosButtons.length; i++) {
    let thiskudoButtons = kudosButtons[i];
    let typeButton = thiskudoButtons.getAttribute("type");
    
    if ( debug > 1 ) { console.log(nameJavaScript + ".main : typeButton : " + typeButton); }
    
    thiskudoButtons.click();
  }
  
}

catch (e) {
  alert("UserScript exception:\n" + e);
}

// Fin code
if ( debug ) { console.log(nameJavaScript + ".main : fin execution code ");}
