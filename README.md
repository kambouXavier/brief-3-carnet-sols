# Carnet d'observation des sols

> Projet individuel du SAS DFS, brief 3 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

L’outil s’adresse à une personne qui relève des informations sur le sol de différentes parcelles. Elle saisit les observations du carnet, notamment la parcelle, la texture, le pH et l’état d’humidité. Le programme peut afficher les observations, ajouter une observation , supprimer une observation , modifier une observation ,  permettre de les rechercher ,  et présenter une synthèse, selon les fonctionnalités disponibles. Il aide à organiser les données dans un carnet. Il ne mesure pas le sol lui-même et ne remplace pas l’observation sur le terrain. Il ne fournit ni diagnostic agronomique ni conseil de fertilisation.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-3-carnet-sols.git
cd brief-3-carnet-sols
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x] Données lues et enregistrées dans `donnees/observations.json`
- [x] Ajouter une observation, saisies invalides refusées sans arrêter le programme
- [x] Lister les observations, message si le carnet est vide
- [x] Rechercher par point ou par parcelle ; filtrer par texture
- [x] Trier par pH
- [x] Synthèse : pH minimum et maximum, nombre par texture, points à discuter (pH < 5,5)
- [x] Bonus : supprimer et modifier une observation (choix 6 et 7)
- [x] Bonus : tri par pH décroissant, texture la plus fréquente

## Données

Les observations sont enregistrées dans le fichier `donnees/observations.json`. Le fichier contient **[nombre] observations**.

Chaque observation comprend un identifiant, une parcelle, une texture du sol, une valeur de pH et un état d’humidité. Les textures autorisées sont *sableux*, *limoneux* et *argileux* ; les états d’humidité autorisés sont *sec*, *intermédiaire* et *humide*. Le pH est un nombre compris entre 0 et 14, **sans unité**.

L’application peut repérer les observations dont le pH est strictement inférieur à 5,5. Ce seuil sert à préparer une discussion avec le coach ; il ne constitue pas un diagnostic.

Les données utilisées dans ce projet sont fictives. Pour le détail des champs et de leurs règles, consultez le [dictionnaire des données](docs/dictionnaire-donnees.md).

## Limites

- Les états d’humidité sont indiqués par catégories (*sec*, *intermédiaire* ou *humide*) et ne donnent pas une mesure précise de la quantité d’eau dans le sol
- Le carnet peut signaler les pH inférieurs à 5,5 pour en discuter avec le coach, mais il ne pose aucun diagnostic et ne recommande pas d’engrais.
- Le carnet ne réalise pas de diagnostic agronomique.


## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

Kambou Roméo Xavier — GitHub : [kambouXavier](https://github.com/kambouXavier).

 J’ai travaillé avec plusieurs personnes qui étudiaient le brief 3. Nous avons échangé pour mieux comprendre le sujet.
