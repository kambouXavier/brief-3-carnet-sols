# Fiche individuelle

> Une page, avant la livraison. Prénom, nom, compte GitHub : 

**Prénom NOM :** Xavier Roméo Kambou
**Compte GitHub :** kambouXavier

1. **Une fonction que j'ai écrite**
Une fonction que j’ai écrite et comment elle marche
// Renvoie une ligne de texte qui décrit l’observation.
// Exemple : "S01 | P1 | sableux | pH 5.2 | sec"

export function formaterObservation(observation) {
  return `${observation.id} | ${observation.parcelle} | ${observation.texture} | pH ${observation.pH} | ${observation.etatHumidite}`;
}

Cette fonction reçoit une observation, puis renvoie ses informations sur une seule ligne : son identifiant, sa parcelle, la texture du sol, son pH et son état d’humidité. Les expressions entre ${ } insèrent les valeurs de l’observation dans le texte.




2. **Une difficulté, et sa solution** : 

Au début du projet, je ne savais pas par quoi commencer. J’ai commencé à coder, puis un ami m’a dit qu’il y avait peut-être un piège et qu’il fallait d’abord remplir toutes les fiches. J’ai donc repris mon travail. Ensuite, j’en ai parlé au coach, qui m’a expliqué que l’ordre dépendait de nous et que nous pouvions choisir par quoi commencer. Cela m’a aidé à mieux organiser mon travail.


3. **L'entraide** (qui m'a aidé, qui j'ai aidé, sur quoi) : 

-j'ai aidé Bene Junior Axel sur la comprehension du sujet et la création du depot github et Brou Emmanuella sur la creation de son depot github
-Junior Djongon et Bene Axel m'ont aidé sur la comprehension du sujet 
