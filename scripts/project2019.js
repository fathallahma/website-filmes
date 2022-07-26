/*/*
 NOM : ID-TALEB 
 GROUPE : 15
*/


var setupListeners = function() {
	for(var i = 0; i < filmData.length; i++){
		createFilm(i);
	}
	var filtrer = document.getElementById("filter");
	filter.addEventListener("keyup",filtrerFilm);
	var details = document.getElementById("showDetails");
	details.addEventListener("change", afficherDetails);
	var films = document.getElementsByClassName("film");
	for(var i = 0; i < films.length; i++){
		films[i].addEventListener("mouseover", afficheText);
		films[i].addEventListener("mouseover", afficheClassement);
		films[i].addEventListener("mouseout", effaceClassement);
		films[i].addEventListener("mouseout", effaceText);
		films[i].addEventListener("click", selectFilm);		
	}
	var selection = document.querySelectorAll("#selection div");
	for(var i = 0; i < selection.length; i++){
		selection[i].addEventListener("click", enleveFilm);
	}
	// Les nouveaux fonctionnalitées 
	var classement = document.getElementById("showClassement");
	classement.addEventListener("click", activeClassement);
	var croissant = document.getElementById("croissant");
	croissant.addEventListener("click", trierFilm);
	
}

// on prépare l'exécution de setupListeners après la chargement du document
window.addEventListener("load", setupListeners);


// ********************************************************************************************************************************************
// Définition des fonctions d'écoute des événements (et des autres fonctions utiles)


/* Cette fonction a pour résultat de créer un élément div qui affiche le i-éme film (selon le tableau filmData)
   dans la zone #catalogue*/
var createFilm = function(index){
	var films = document.getElementById("films");
	var newdiv = document.createElement("div");
	newdiv.id = (index+1)+"-film";
	newdiv.className = "film";
	var newImg = document.createElement("img");
	newImg.src = filmData[index].image;
	var newTitle = document.createElement("h3");
	var titleName = filmData[index].title;
	newTitle.textContent = titleName;
	newImg.alt = newTitle.textContent;
	films.appendChild(newdiv);
	newdiv.appendChild(newImg);
	newdiv.appendChild(newTitle);
}

/* la fonction suivante permet de filtrer les films sans prendre en considération 
   les lettres majuscules ou minuscules*/
var filtrerFilm = function(){
	var filterValue = this.value.toUpperCase();
	var films = document.getElementById("films");
	var filmsTab = films.getElementsByTagName("h3");
	for(var i = 0; i < filmsTab.length; i++){
		j = i + 1;
		var nameId = j + "-film";
		var film = document.getElementById(nameId);
		var title = filmsTab[i].textContent.toUpperCase();
		if (title.includes(filterValue)){
			// afficher ce film 
			film.style.display = "inline-block";
		}
		else{
			//masquer ce film
			film.style.display = "none";
		}
		j++;
	}	
}

/*
  cette fonction a pour résultat d'afficher la zone de détails si le boutton est coché,
  sinon la zone est masquée.
 */
var afficherDetails = function(){
	var infoDetail = document.getElementById("details");
	var catalog = document.getElementById("catalog");
	if (this.checked){
		infoDetail.style.display = "block";
	}
	else{
		infoDetail.style.display = "none";
	}	
}

/*
 cette fonction a pour résultat d'afficher les détails d'un film dans la zone inférieure
 à chaque survole sur un film
 */
var afficheText = function(){
	   var details = document.getElementById("showDetails");
	   var infoDetail = document.getElementById("details");
	   var catalog = document.getElementById("catalog");
	   if(details.checked || catalog.lastElementChild == infoDetail ){
	      var idFilm = this.id;
	      for (var i = 0; i < idFilm.length; i++){
		      if (idFilm[i] == "-"){
			      var numeroFilm = idFilm.substring(0,i);
		      }
	      }
	      var textFilm = filmData[numeroFilm-1].text;
	      infoDetail.innerHTML = textFilm;
       }
 
}

/*
 cette fonction a pour résultat d'effacer les détails dans la zone inférieure 
 lorsqu'on survole sur les autres éléments de la page (hors zone où sont affichés les films).
 */
var effaceText = function(){
	var catalog = document.getElementById("catalog");
	var details = document.getElementById("showDetails");
	var infoDetail = document.getElementById("details");
	if(details.checked || catalog.lastElementChild == infoDetail ){
	   infoDetail.innerHTML = "";
    }
}

var toto;
/*
  Cette Fonction (sans param) permet de vérifier si la zone #selection est vide ou non,
  * si c'est le cas(est vide), on vérifie quelle partie qui est vide, puis on insère le film sur la partie vide.
  * sinon, une alerte est déclenchée qui affiche que la zone #selection est pleine, et le film séléctioné ne pourrait pas être ajouté. 
 */
var selectFilm = function(){
	var select1 = document.getElementById("select1");
	var select2 = document.getElementById("select2");
	var select1Content = select1.innerHTML;
	var select2Content = select2.innerHTML;

	if((select1Content == "<span>1</span>")||(select2Content == "<span>2</span>")){
		if (select1Content == "<span>1</span>"){
			var parentNode1 = document.querySelector("#select1 span").parentNode;
		    var filsSpan1 = document.querySelector("#select1 span");
		    parentNode1.insertBefore(this, filsSpan1);    
		    this.removeEventListener("click",selectFilm); 
		    this.addEventListener("click", effaceClassement);  	    
		}
		else if (select2Content == "<span>2</span>"){
			var parentNode2 = document.querySelector("#select2 span").parentNode;
		    var filsSpan2 = document.querySelector("#select2 span");
		    parentNode2.insertBefore(this, filsSpan2); 
		    this.removeEventListener("click",selectFilm);
		    this.addEventListener("click", effaceClassement);  
		}
		
	}
    
    else{
		if (typeof toto == "undefined"){
		   if(select1Content != "<span>1</span>" && select2Content != "<span>2</span>"){
			   window.alert("Vous avez choisit deux Films, Veuillez retirez un de vos films préféré");
		   } 
		   toto += 1;
		}
	} 
	
}

/*Cette fonction(sans param) a pour résultat de retirer le film préféré dans la zone #selection et le rajouter à la fin dans la zone #films */
var enleveFilm = function(){
	var filmPrefere = this.firstChild;
	for (var i = 0; i < 11; i++){
	    if (filmPrefere.id == (i+"-film")){ 
	        this.firstChild.addEventListener("click", selectFilm);	
	        document.getElementById("films").appendChild(this.firstChild);
        } 
    }
}

//************************************************************************************************************************************************
//**************************************************** Nouveaux fonctionnalitées *****************************************************************
//************************************************************************************************************************************************



/* Cette fonction(sans param) a pour résultat d'activer l'affichage du classement ou le désactiver,
*/
var activeClassement = function(){
	if (this.checked){
		var film = document.getElementsByClassName("film");
		for(var i = 0; i < film.length; i++){
		     film[i].addEventListener("mouseover", afficheClassement);
		}
		
	}
	else{
		var film = document.getElementsByClassName("film");
		for(var i = 0; i < film.length; i++){
		     film[i].removeEventListener("mouseover", afficheClassement);
		}
	}
}

/*Cette fonction(sans param) a pour résultat d'afficher le classement du film survolé,
   A chaque survole sur un film, le titre du film survolé est remplacé par son classement.
*/
var afficheClassement = function(){
	var showClassement = document.getElementById("showClassement");
	var idFilm = this.id;
	// pour récupérer le numero du film à partir de son id
	  for (var i = 0; i < idFilm.length; i++){
		  if (idFilm[i] == "-"){
	          var numeroFilm = idFilm.substring(0,i);
		  }
	  }
	// ****************************************************      
	if(showClassement.checked){
	   var titleSelect = this.lastElementChild;
	   titleSelect.textContent = filmData[numeroFilm-1].Classement;
    }
}

/*
  Cette fonction(sans param) a pour résultat d'effacer le classement du film lorsqu'on arrête le survole du film.
  - C'est à dire, Lorsqu'on arrête le survole sur l'élement d'id "i-film", on restaure l'état initial (le classement du film est remplacé par le titre du film).
*/
var effaceClassement = function(){
	var idFilm = this.id;
	for (var i = 0; i < idFilm.length; i++){
		if (idFilm[i] == "-"){
			var numeroFilm = idFilm.substring(0,i);
		}
	}
	var titleSelect = this.lastElementChild;
	titleSelect.textContent = filmData[numeroFilm-1].title;
}

// fonction qui renvoie une valeur aléatoire d'un un interval
function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

// variable globale utilisée pour le trie des films dans les fonctions qui suivent,
// c'est un tableau qui contient les titres de tous les films trié dans l'ordre croissant de leurs classements
var listTitre = [    "Escape game",
	                 "Le Retour du Jedi",
	                 "La Communauté de l'Anneau",
	                 "Le Retour du Roi", 
	                 "Les Deux Tours",
	                 "Indiana Jones et le Temple Maudit",
	                 "Indiana Jones et la Dernière Croisade",
	                 "La Guerre des Etoiles",
	                 "Les Aventuriers de l'Arche Perdue",
	                 "L'Empire Contre Attaque"
	            ];
	                 
/* Cette fonction(sans param) renvoie une liste triée de tous les éléments de la classe (.film) dans un ordre croissant selon leurs classements.
   - si on coche le button, alors on applique l'algorithme de tri par insertion. Grâce à cet algo on trie le tableau qui va contenir les éléments films de la classe (.film).
   - si on décoche le button, une alerte est déclenchée qui affiche aux utilisateurs que les films seront afficher aléatoirement.
*/
var filmsCroissant = function(){
	var trieButton = document.getElementById("croissant");
	var listDiv = Array.from(document.getElementsByClassName("film"));                 
    var listCopy = listDiv.slice();
    if(trieButton.checked){
	  
      for(var i = 0; i < listTitre.length; i++){
	    for(var j = 0; j < listDiv.length; j++){
			var divTitle = listDiv[j].lastElementChild.textContent;
			if (divTitle == listTitre[i] && i != j && i < 6){
				listDiv[i] = listDiv[j];
				listDiv[j] = listCopy[i];
			    continue;		
			}
			else if(divTitle == listTitre[i] && i == j && i < 6){
				listDiv[i] = listDiv[j];
			}
			else if( divTitle == listTitre[i] && i != j && i >= 6){
			    var listCopy = listDiv.slice();
			    listDiv[i] = listDiv[j];
				listDiv[j] = listCopy[i]; 		
			}
		} 
      } 
    }
    else{
	  if (typeof toto == "undefined"){
		window.alert("Les Films seront afficher aléatoirement");		
		for(var i = 0; i < listTitre.length; i++){
	      for(var j = 0; j < listDiv.length; j++){
			var divTitle = listDiv[j].lastElementChild.textContent;
			if (divTitle == listTitre[i]){
			   var randomInt = 	getRandom(0, listDiv.length);
			   listDiv[j] = listCopy[randomInt];
		    }
		    else{
			   continue;		
			}
          }
	    }
	    toto = 1;
	   }   
	}	
    return listDiv;
}

/*
  Cette fonction(sans param) a pour résultat de mettre en ordre les films par ordre croissant selon leurs classements
*/
var trierFilm = function(){
	var parentNode1 = document.getElementById("films");
	var listeTrie = filmsCroissant();
	if(this.checked){
	   var listfilm = (document.getElementsByClassName("film"));	
	   for(var  j = 0; j < listeTrie.length; j++){
		   parentNode1.insertBefore(listeTrie[j], listfilm[j]);
       }
    }
    else{
       var listfilm = document.getElementsByClassName("film");	
	   for(var i = 0; i < listeTrie.length; i++){
		   parentNode1.insertBefore(listeTrie[i], listfilm[i]);
       }  
}
}
