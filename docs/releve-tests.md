# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : 

- Nombre total d’observations : 10
- pH minimum : 4,8 — observation S04
- pH maximum : 7,6 — observation S08
- Nombre de sols sableux : 3
- Nombre de sols limoneux : 4
- Nombre de sols argileux : 3
- Points dont le pH est strictement inférieur à 5,5 : S01, S04, S06, S09

## Vérification du comptage par texture

- Sableux : S01, S04, S08 — 3 observations
- Limoneux : S02, S05, S07, S10 — 4 observations
- Argileux : S03, S06, S09 — 3 observations

## Observations dont le pH est strictement inférieur à 5,5

### Observation 1

- ID : S01
- Parcelle : P1
- Texture : sableux
- pH : 5,2

### Observation 4

- ID : S04
- Parcelle : P2
- Texture : sableux
- pH : 4,8

### Observation 6

- ID : S06
- Parcelle : P3
- Texture : argileux
- pH : 5,4

### Observation 9

- ID : S09
- Parcelle : P5
- Texture : argileux
- pH : 5,1


**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |

| Ajout d'une observation valide | L'observation est acceptée et enregistrée | Observation ajoutée avec succès. | Koffi Boagr VIEGNEKOU |
| Conservation après redémarrage | L'observation ajoutée reste présente après le redémarrage | À vérifier | Koffi Boagr VIEGNEKOU |
| Ajout avec pH = 14,1 | La saisie est refusée | À vérifier | Koffi Boagr VIEGNEKOU |
| Recherche S99 | Aucun résultat trouvé | Choix inconnu : retour au menu. Test de recherche à refaire. | Koffi Boagr VIEGNEKOU |
| Tri par pH | Les observations sont classées selon le pH croissant | Observations classées par pH dans l'ordre croissant. | Koffi Boagr VIEGNEKOU |
| Synthèse | Les valeurs calculées correspondent aux calculs manuels | pH minimum : 4,8 ; pH maximum : 7,6. | Koffi Boagr VIEGNEKOU |
| Choix inconnu | Le programme refuse le choix et continue | Choix inconnu : « 99 ». Tapez un chiffre du menu. | Koffi Boagr VIEGNEKOU |


## 2. Vérification des règles de validation

| Cas vérifié | Calcul ou règle manuelle | Résultat attendu | Résultat obtenu |
|---|---|---|---|
| pH = 14 | Valeur comprise entre 0 et 14 | Accepté | À vérifier |
| pH = 14,1 | Valeur supérieure à 14 | Refusé | À vérifier |
| pH = -1 | Valeur inférieure à 0 | Refusé | À vérifier |
| pH vide | Absence de valeur numérique | Refusé | À vérifier |
| Humidité invalide | Valeur différente de sec, intermédiaire ou humide | Refusé | À vérifier |


**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : 

- Le dépôt est correctement cloné.
- L'application démarre sans erreur.
- Le menu principal s'affiche.
- Les tests s'exécutent correctement.

**Testeur :** Koffi Boagr VIEGNEKOU
