// Carnet d'observation des sols — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { HUMIDITES, TEXTURES, ajouterObservation, formaterObservation, listerObservations, trouverParId } from './src/registre.js';
import { filtrerParParcelle, filtrerParTexture, trierParPh } from './src/recherche.js';
import { SEUIL_PH_A_DISCUTER, compterParTexture, phMinMax, pointsADiscuter } from './src/synthese.js';
import { supprimerObservation,modifierObservation,trierParPhDecroissant,textureLaPlusFrequente, } from './src/bonus.js';


const FICHIER_DONNEES = 'donnees/observations.json';


// ---------- Affichages ----------

function afficherAccueil() {
  console.log('==================================================');
  console.log('   Ferme pédagogique');
  console.log('==================================================');
}

function afficherMenu() {
  console.log('');
  console.log('--------------------- MENU ---------------------');
  console.log('1. Ajouter une observation');
  console.log('2. Lister les observations');
  console.log('3. Rechercher (point, parcelle, texture)');
  console.log('4. Trier par pH');
  console.log('5. Synthèse des observations');
  console.log('6. Supprimer une observation');
  console.log('7. Modifier une observation');
  console.log('0. Quitter');
}


// ---------- Actions ----------

// Choix 1 : poser les cinq questions, vérifier, ajouter, enregistrer.
async function ajouter(observations) {
  console.log('--- Ajouter une observation ---');

  const id = await demander('Point observé (ex. S11) : ');
  if (id === null) return;
  const parcelle = await demander('Parcelle (ex. P1) : ');
  if (parcelle === null) return;
  const texture = await demander(`Texture (${TEXTURES.join(', ')}) : `);
  if (texture === null) return;
  const pH = await demander('pH (nombre de 0 à 14, sans unité, virgule acceptée) : ');
  if (pH === null) return;
  const etatHumidite = await demander(`État d'humidité (${HUMIDITES.join(', ')}) : `);
  if (etatHumidite === null) return;

  // Normalisation avant vérification : majuscules pour le point et la parcelle,
  // minuscules pour la texture et l'état d'humidité, le pH reste tel quel.
  const saisie = {
    id: id.toUpperCase(),
    parcelle: parcelle.toUpperCase(),
    texture: texture.toLowerCase(),
    pH,
    etatHumidite: etatHumidite.toLowerCase(),
  };

  const erreurs = ajouterObservation(observations, saisie);
  if (erreurs.length > 0) {
    console.log('Observation refusée :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    console.log(`Le carnet compte toujours ${observations.length} observation(s).`);
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log(`Observation ${saisie.id} ajoutée. Le carnet compte ${observations.length} observation(s).`);
}

// Choix 2 : lister.
function lister(observations) {
  console.log(`--- Liste des observations (${observations.length}) ---`);
  console.log(listerObservations(observations));
}

// Choix 3 : rechercher par point, parcelle ou texture.
async function rechercher(observations) {
  console.log('--- Rechercher ---');
  console.log('1. Par point (identifiant)');
  console.log('2. Par parcelle');
  console.log('3. Les observations d\'une texture');
  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  switch (sousChoix) {
    case '1': {
      const saisie = await demander('Point : ');
      if (saisie === null) return;
      const id = saisie.toUpperCase();
      const observation = trouverParId(observations, id);
      console.log(observation === undefined ? `Observation ${id} introuvable.` : formaterObservation(observation));
      break;
    }
    case '2': {
      const saisie = await demander('Parcelle : ');
      if (saisie === null) return;
      const parcelle = saisie.toUpperCase();
      const trouvees = filtrerParParcelle(observations, parcelle);
      console.log(`${trouvees.length} observation(s) sur la parcelle ${parcelle} :`);
      console.log(listerObservations(trouvees));
      break;
    }
    case '3': {
      const saisie = await demander('Texture : ');
      if (saisie === null) return;
      const texture = saisie.toLowerCase();
      const trouvees = filtrerParTexture(observations, texture);
      console.log(`${trouvees.length} observation(s) de texture ${texture} :`);
      console.log(listerObservations(trouvees));
      break;
    }
    default:
      console.log('Choix inconnu : retour au menu.');
  }
}

// Choix 4 : trier par pH (le carnet d'origine ne change pas d'ordre).

async function trier(observations) {
  console.log('--- Trier ---');
  console.log('1. Par pH croissant');
  console.log('2. Par pH décroissant');

  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    console.log(listerObservations(trierParPh(observations)));
  } else if (sousChoix === '2') {
    console.log(listerObservations(trierParPhDecroissant(observations)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

// Choix 5 : synthèse.
function synthese(observations) {

  const textureFrequent = textureLaPlusFrequente(observations);

if (textureFrequent === null) {
  console.log('Texture la plus fréquente : aucune observation');
} else {
  console.log(
    `Texture la plus fréquente : ${textureFrequent.texture} (${textureFrequent.nombre} observation(s))`
  );
}

  console.log('--- Synthèse des observations ---');
  console.log(`Nombre d'observations : ${observations.length}`);

  const bornes = phMinMax(observations);
  if (bornes === null) {
    console.log('pH minimum et maximum : aucune donnée');
  } else {
    console.log(`pH minimum : ${bornes.min} · pH maximum : ${bornes.max}`);
  }

  console.log('Observations par texture :');
  for (const [texture, nombre] of Object.entries(compterParTexture(observations))) {
    console.log(`  ${texture} : ${nombre}`);
  }

  const aDiscuter = pointsADiscuter(observations, SEUIL_PH_A_DISCUTER);
  console.log(`Points à discuter avec le coach (pH < ${SEUIL_PH_A_DISCUTER}) : ${aDiscuter.length}`);
  for (const observation of aDiscuter) {
    console.log(`  ${formaterObservation(observation)}`);
  }

  console.log('Rappels : le pH est sans unité. Aucune moyenne de pH n\'est calculée (échelle logarithmique).');
  console.log('Ces points ne sont pas un diagnostic de fertilisation : ils servent à préparer l\'échange avec le coach.');
}

// Choix 6 : demande l'identifiant, supprime l'observation et enregistre le carnet.
async function supprimer(observations) {
  const saisie = await demander('Identifiant du point à supprimer : ');
  if (saisie === null) return;

  const id = saisie.trim().toUpperCase();
  const supprimee = supprimerObservation(observations, id);

  if (supprimee === undefined) {
    console.log(`Observation ${id} introuvable. Le carnet n'a pas été modifié.`);
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log(`Observation ${id} supprimée et carnet enregistré.`);
}

// Choix 7 : demande l'identifiant, le champ et sa nouvelle valeur.
async function modifier(observations) {
  const saisieId = await demander('Identifiant du point à modifier : ');
  if (saisieId === null) return;

  console.log('Quel champ veux-tu modifier ?');
  console.log('1. Parcelle');
  console.log('2. Texture');
  console.log('3. pH');
  console.log("4. État d'humidité");

  const choixChamp = await demander('Votre choix : ');
  if (choixChamp === null) return;

  const champs = {
    '1': 'parcelle',
    '2': 'texture',
    '3': 'pH',
    '4': 'etatHumidite',
  };

  const champ = champs[choixChamp];

  if (champ === undefined) {
    console.log('Choix inconnu : aucune modification effectuée.');
    return;
  }

  const valeur = await demander(`Nouvelle valeur pour ${champ} : `);
  if (valeur === null) return;

  const id = saisieId.trim().toUpperCase();
  let nouvelleValeur = valeur.trim();

  if (champ === 'parcelle') {
    nouvelleValeur = nouvelleValeur.toUpperCase();
  } else if (champ === 'texture' || champ === 'etatHumidite') {
    nouvelleValeur = nouvelleValeur.toLowerCase();
  }

  const erreurs = modifierObservation(observations, id, champ, nouvelleValeur);

  if (erreurs.length > 0) {
    console.log('Modification refusée :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log(`Observation ${id} modifiée et carnet enregistré.`);
}


// ---------- Programme principal ----------

async function main() {
  ouvrirSaisie();
  afficherAccueil();

  // Chargement des données : si ça échoue, on continue avec un carnet vide.
  let observations = [];
  try {
    observations = await chargerJson(FICHIER_DONNEES);
    console.log(`${observations.length} observation(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le carnet démarre vide.`);
    observations = [];
  }

  let continuer = true;
  while (continuer) {
    afficherMenu();
    const choix = await demander('Votre choix : ');

    // Saisie fermée (Ctrl+C) : on quitte.
    if (choix === null) {
      break;
    }

    try {
      switch (choix) {
        case '1':
          await ajouter(observations);
          break;
        case '2':
          lister(observations);
          break;
        case '3':
          await rechercher(observations);
          break;
        case '4':
          await trier(observations);
          break;
        case '5':
          synthese(observations);
          break;
        case '6':
          await supprimer(observations);
          break;
        case '7':
          await modifier(observations);
          break;
        case '0':
          console.log('Au revoir !');
          continuer = false;
          break;
        default:
          console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
      }
    } catch (erreur) {
      // Aucune erreur n'arrête le programme : le menu revient toujours.
      if (String(erreur.message).startsWith('TODO')) {
        console.log(`À compléter : ${erreur.message}`);
      } else {
        console.log(`Erreur inattendue : ${erreur.message}`);
      }
    }
  }

  fermerSaisie();
}

main();
