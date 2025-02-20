export function ajoutListenerAvis() { // Fontcion pour ajouter des eventListener a tous mes boutons pour eviter de le faire un a un
    
    const piecesElements = document.querySelectorAll(".fiches article button"); // piecesElement est une liste de "Boutons"

    for(let i = 0; i< piecesElements.length; i++){

        piecesElements[i].addEventListener("click", async function (event) {
            let id = event.target.dataset.id
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`)  // cette reponse est sous forme de chaine de caractere au format JSON que nous devons reconstruire avec "reponse.json()"
            const avis = await reponse.json();
            // console.log(avis)
            // Sauvergadez les avis dans le localStorage
            const valeursAvis = JSON.stringify(avis);
            window.localStorage.setItem(`avis-piece-${id}`, valeursAvis);
            // avis contient desormais une liste d'objets
            const pieceElement = event.target.parentElement;
            afficherAvis(pieceElement, avis);

            // console.log(pieceElement)
            
        });
    }
}

export function afficherAvis(pieceElement, avis){
    const avisElement = document.createElement("p")
    for(let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `<b>${avis[i].utilisateur} :</b> ${avis[i].commentaire} <br>`
        pieceElement.appendChild(avisElement)
    }
    
    
}

// Ajout du listener au formulaire
export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.querySelector("[name=utilisateur]").value // avec ca ou l'autre method comme pour l'id et le commentaire
    console.log(name) 
    const pieceId = document.querySelector("[name=piece-id]").value 
    // Creation de l'objet du nouvel avis
    const avis = {
        pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
        utilisateur: name,
        commentaire: event.target.querySelector("[name=commentaire]").value,
        nbEtoiles: event.target.querySelector("[name=nbEtoile]").value
    }
    console.log(avis)
    // Conversion de l'objet au format JSON pour etre transmis dans le body
    const chargeUtile = JSON.stringify(avis);
    // envoi de la requete au server
    fetch(`http://localhost:8081/avis`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: chargeUtile
    })

    });
 }

// Utilisation de la librairie chartJS pour les avis
 export async function afficherGraphiqueAvis(){
    // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
    const nb_commentaires = [0, 0, 0, 0, 0];
    for (let commentaire of avis) {
        nb_commentaires[commentaire.nbEtoiles - 1]++;
    }
    // Légende qui s'affichera sur la gauche à côté de la barre horizontale
    const labels = ["5", "4", "3", "2", "1"];
    // Données et personnalisation du graphique
    const data = {
        labels: labels,
        datasets: [{
        label: "Étoiles attribuées",
        data: nb_commentaires.reverse(),
        backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
        }],
    };
    // Objet de configuration final
    const config = {
        type: "bar",
        data: data,
        options: {
        indexAxis: "y",
        },
    };
    // Rendu graphique dans l'elt canvas
    const graphiqueAvis = new Chart(
        document.querySelector("#graphique-avis"),
        config,
    )
    }


export async function afficherAvisDispo() {
    const pieces = await fetch("http://localhost:8081/pieces").then(pieces => pieces.json());
    const avis =  await fetch("http://localhost:8081/avis").then(avis => avis.json());
    let nb_commentaires_dispo = 0;
    let nb_commentaires_indispo = 0;

    for(let i =0; i < pieces.length; i++){
        if(pieces[i].disponibilite === true){
            for(let j = 0; j < avis.length; j++){
                if(avis[j].pieceId === pieces[i].id){
                    nb_commentaires_dispo++;
                    
                }
            }
        }
        if(pieces[i].disponibilite === false){
            for(let j = 0; j < avis.length; j++){
                if(avis[j].pieceId === pieces[i].id){
                    nb_commentaires_indispo++
                    
                }
            }
        }
    }
    console.log(nb_commentaires_indispo)
    console.log(nb_commentaires_dispo)

    // La legende du graphe
    const labels = ["dispo", "nonDispo"];
    // Donnee et personnalisatin du graphique
    const data = {
        labels: labels,
        datasets: [{
            label: 'Nombre de commentaire',
            data: [nb_commentaires_dispo, nb_commentaires_indispo],
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgb(255, 159, 64)',
                'rgb(54, 162, 235)'
            ],
            borderWidth: 1
        }]

    }
    // Objet de configuration final
    const config = {
        type: "bar",
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero:true
                }
            },
            
        }
    }
    // Rendu graphique dans l'elt canvas
    const graphiqueAvis = new Chart(
        document.querySelector("#graphique-dispo"),
        config,
    )
}