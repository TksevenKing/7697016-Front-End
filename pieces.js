// Pour manipuler nos donnees etant au format JSON nous devons les importer dans notre code
// Pour cela on va utiliser la focntion "fetch"

import { ajoutListenerAvis, ajoutListenerEnvoyerAvis, afficherAvis, afficherGraphiqueAvis, afficherAvisDispo } from "./avis.js";
// import { Chart } from "https://cdn.jsdelivr.net/npm/chart.js"
// Recuperation des pieces eventuellement stockees dans le localStorage ceci doit etre fait avant l'appel de la fonction fetch
let  pieces = window.localStorage.getItem("pieces");

if(pieces === null) { // si le code s'execute pour la premiere fois alors le localStorage sera vide donc recuperer les donnees depuis l"API
    // Recuperatrion des pieces depuis l'API
    pieces = await fetch("http://localhost:8081/pieces/").then(pieces => pieces.json())
    // Transformation des pieces en JSON pour le localStorage
    const valeurPieces = JSON.stringify(pieces)

    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);
}else{
    pieces = JSON.parse(pieces) // Convert a JSON string into an object
}
// window.localStorage.removeItem("pieces")


// Premiere affichage de la page
affichePieces(pieces)
// Ajout du listener au formuailre envoyer Avis
ajoutListenerEnvoyerAvis();

// Fonctionn qui genere toute la page web
function affichePieces(listePieces){
    for(let i=0; i<listePieces.length;i++){

        const article = listePieces[i];
        // Recuperation de l'elt du DOM  qui accuellira les fiches 
        let sectionFiches = document.querySelector(".fiches")
        // Creation des balises
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2")
        nomElement.innerText = article.nom
        const prixElement = document.createElement("p")
        prixElement.innerText = `Prix: ${article.prix} $ (${article.prix < 35 ? "$" : "$$$"})`;
        const categorieElement = document.createElement("p")
        categorieElement.innerText = article.categorie ?? "(auncune categorie)";
        const descriptionElement = document.createElement("p")
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment";
        const stockElement = document.createElement("p")
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les  avis"
        // console.log(avisBouton)
        
        
        
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        pieceElement.dataset.id = pieces[i].id;
        sectionFiches.appendChild(pieceElement)
        pieceElement.appendChild(imageElement)
        pieceElement.appendChild(nomElement)
        pieceElement.appendChild(prixElement)
        pieceElement.appendChild(categorieElement)
        pieceElement.appendChild(descriptionElement)
        pieceElement.appendChild(stockElement)
        pieceElement.appendChild(avisBouton)
    
    }
    // Ajout de la fonction ajoutListenerAvis
    ajoutListenerAvis();
}

// Pour chaque pieces si il a une avis deja dans le localStorage alors affuicher l'avis
for(let i = 0; i < pieces.length; i++){
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
    const avis = JSON.parse(avisJSON);

    if(avis !== null){
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);
        // console.log(pieceElement)
        afficherAvis(pieceElement, avis);
    }
}

// Gestion des boutons
const boutonTrier = document.querySelector(".btn-trier")
boutonTrier.addEventListener("click", function() {
    // Faire une copie de liste d'origine sinon son contenu sera trier et on ne pourra pas revenir 
    const piecesOrdonnees = Array.from(pieces)  // Array.form(nomTab) permet de copier une liste
    piecesOrdonnees.sort(function (a, b){
        return a.prix - b.prix;   // Condition du trie
    });
    console.log(piecesOrdonnees);
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = '' //Effacer l'ecran
    affichePieces(piecesOrdonnees)  //et regeneration de la page avec affichePieces()

})

const boutonFiltrer = document.querySelector(".btn-filtrer")
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {  // la focntion filter a un seul arg (un elt de la liste) et return "true " or "false" i.e si l'elt doit apparaitre ou non
        return piece.prix <= 35;  // Condition de filtrage
    })
    console.log(piecesFiltrees)
    document.querySelector(".fiches").innerHTML = ''
    affichePieces(piecesFiltrees)
})

const boutonDescription = document.querySelector(".btn-description")
boutonDescription.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function (piece){
        return piece.description   // Pour n'afficher que seules les articles qui ont une description
    })
    console.log(piecesFiltrees)
    document.querySelector(".fiches").innerHTML = ''
    affichePieces(piecesFiltrees)
})

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant")
boutonTrierDecroissant.addEventListener("click", function (){
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort(function(a, b){
        return b.prix - a.prix // Ordre decroissant
    })
    console.log(piecesOrdonnees)
    document.querySelector(".fiches").innerHTML = ''
    affichePieces(piecesOrdonnees)
})

// utilisation de la fct .map() en utilisant la fct lambda
// Fonction lambda
piece => piece.nom

// Fonction normale
function t(piece) {
    return piece.nom
}

const noms = pieces.map(piece => piece.nom)
console.log(noms)
for(let i = pieces.length - 1; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1)  // si le prix d'un elt > 35 on le supprime avec .splice(indice de debut de suppression, combien d'elt a supprimer)  et toujours commencer de la fin du tableau sinon 
                          // ceratain elts ne seront pas traiter a cause du decalage cause par la suppression
    }
}

let ul = document.createElement("ul")

for(let i=0;i<noms.length;i++){
    let li = document.createElement("li")
    li.innerText = noms[i]
    ul.appendChild(li)
}

let piecesAbordables = document.querySelector(".abordables")
piecesAbordables.appendChild(ul)


const nomsDisponibles = pieces.map(piece => piece.nom)
const prixDisponibles = pieces.map(piece => piece.prix)

for(let i = pieces.length - 1 ;i <= 0; i--){
    if(pieces.disponibilite === false){  // Si la piece n'est pas disponible, l'enleve des deux listes
        nomsDisponibles.splice(i,1)
        prixDisponibles.splice(i,1)
    }
}

let ulDispo = document.createElement("ul")

for(let i=0;i<noms.length;i++){
    let li = document.createElement("li")
    li.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]}$`
    ulDispo.appendChild(li)
}

document.querySelector(".disponibles").appendChild(ulDispo)

// Afficher les pieces  en fonction de la valeur de l'input range
let inputRange = document.querySelector("input[name='maxPrix']")
console.log(inputRange)
inputRange.addEventListener("change", (event) => {
    let rangeValue = event.target.value;
    document.querySelector(".filtres span").innerText = event.target.value
    // Filtrer le contenu de la page en fct du rangeValue
    let piecesFiltrees = pieces.filter(function (piece){
        return piece.prix > rangeValue
    })
    console.log(piecesFiltrees)
    document.querySelector(".fiches").innerHTML = ''
    affichePieces(piecesFiltrees)
})

// Effacer le contenu du localStorage
const btnMaj = document.querySelector(".btn-maj")
btnMaj.addEventListener("click", () => {
    window.localStorage.removeItem("pieces")
    console.log("Suppression des donnees du localStorage")
})


// Appel de la fct pour afficherGraphique avis
 await afficherGraphiqueAvis();

 await afficherAvisDispo();







