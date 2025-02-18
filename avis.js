export function ajoutListenerAvis() { // Fontcion pour ajouter des eventListener a tous mes boutons pour eviter de le faire un a un
    const piecesElements = document.querySelectorAll(".fiches article button"); // piecesElement est une liste de "Boutons"

    for(let i = 0; i< piecesElements.length; i++){
        piecesElements[i].addEventListener("click", async function (event) {
            let id = event.target.dataset.id
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`)  // ctte reponse est sous forme de chaine de caractere au format JSON que nous devons reconstruire avec "reponse.json()"
            const avis = await reponse.json();
            console.log(avis)
            // avis contient desormais une liste d'objets
            const pieceElement = event.target.parentElement;
            const avisElement = document.createElement("p")
            for(let i = 0; i < avis.length; i++) {
                avisElement.innerHTML += `<b>${avis[i].utilisateur} :</b> ${avis[i].commentaire} <br>`
                pieceElement.appendChild(avisElement)
            }
            console.log(pieceElement)
            
        });
    }
}