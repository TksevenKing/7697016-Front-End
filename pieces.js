// Pour manipuler nos donnees etant au format JSON nous devons les importer dans notre code
// Pour cela on va utiliser la focntion "fetch"

const reponse = await fetch("pieces-autos.json")  // Recuperation des pieces depuis le fichier 
const pieces = await reponse.json(); // on met la liste de pieces  recuperer dans "pieces"

const article = pieces[0];
const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2")
nomElement.innerText = article.nom
const prixElement = document.createElement("p")
prixElement.innerText = `Prix: ${article.prix} $ (${article.prix < 35 ? "$" : "$$$"})`;
const categorieElement = document.createElement("p")
categorieElement.innerText = article.categorie ?? "(auncune categorie)";  // '??' = 'nullish' et est utilise pour gerer l'absence de categorie
const descriptionElement = document.createElement("p")
descriptionElement.innerText = article.description ?? "Pas de description pour le moment";
const disponibilite = document.createElement("p")
disponibilite.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

// Ratachement de nos balise au DOM
let sectionFiches = document.querySelector(".fiches")
sectionFiches.appendChild(imageElement)
sectionFiches.appendChild(nomElement)
sectionFiches.appendChild(prixElement)
sectionFiches.appendChild(prixElement)
sectionFiches.appendChild(categorieElement)
sectionFiches.appendChild(descriptionElement)
sectionFiches.appendChild(disponibilite)

for(let i=0; i<pieces.length;i++){
    const article = pieces[i];
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
    const disponibilite = document.createElement("p")
    disponibilite.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    let sectionFiches = document.querySelector(".fiches")
    sectionFiches.appendChild(imageElement)
    sectionFiches.appendChild(nomElement)
    sectionFiches.appendChild(prixElement)
    sectionFiches.appendChild(prixElement)
    sectionFiches.appendChild(categorieElement)
    sectionFiches.appendChild(descriptionElement)
    sectionFiches.appendChild(disponibilite)
}





