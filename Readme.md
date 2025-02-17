[![Node.js CI](https://github.com/betagouv/anssi-nis2/actions/workflows/node.js.yml/badge.svg)](https://github.com/betagouv/anssi-nis2/actions/workflows/node.js.yml)
[![Storybook Tests](https://github.com/betagouv/anssi-nis2/actions/workflows/storybook-build.yml/badge.svg)](https://github.com/betagouv/anssi-nis2/actions/workflows/storybook-build.yml)

# Mon Espace NIS 2

_Mon Espace NIS 2_ est un service numérique développé par le laboratoire
d'innovation de l'[ANSSI](https://www.ssi.gouv.fr/), en lien avec l'incubateur
[BetaGouv](https://beta.gouv.fr/) de la direction interministérielle du
numérique pour soutenir la mise en œuvre française de la directive européenne NIS2.

NIS 2 (Network and Information Security version 2) vise à harmoniser et renforcer la cybersécurité du marché européen.
Le portail dont le code est porté dans ce dépôt vise à faciliter le parcours des futurs entités (privées et publiques)
réglementées par ce cadre de loi.

## Configuration de l'environnement de développement

### Prérequis

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Node.js v22](https://nodejs.org/en/)

### Installation

Récupération du code depuis github:

```sh
git clone https://github.com/betagouv/anssi-nis2.git
cd anssi-nis2
```

Créer un réseau virtuel docker pour les containers du projet :

```sh
docker network create nis2
```

Exécuter la construction automatique docker:

```shell
docker compose up
```

Démarre et initialise la base de donnée si nécessaire, puis lance le serveur d'API avec le site front en static

## Lancement des serveurs

Serveur Web + API:

```shell
docker compose restart api
```

Serveur DB (PostgreSQL):

```shell
docker compose restart db
```

## Construction des distributions statiques

Construction du front web et de l'API:

```shell
npm run build
```

## Exécution des tests

```shell
npm test
```

## Structure du dépôt

```text
+---anssi-nis2-api                  // Serveur d'API (NestJS)
°   +---dist
°   +---node_modules
°   +---src
°   °   +---database
°   °   +---Domaine
°   °   +---simulateur-reponse
°   °   +---test
°   +---test
+---anssi-nis2-ui                   // SPA frontend (Vite + React)
°   +---.storybook
°   +---dist
°   +---node_modules
°   +---public
°   +---src
°   °   +---.storybook
°   °   +---assets
°   °   +---Components
°   °   °   +---Accueil
°   °   °   +---Echaffaudages
°   °   °   +---Simulateur
°   °   +---Domaine
°   °   °   +---Simulateur
°   °   +---Services
°   °   °   +---Echaffaudages
°   °   °   +---Simulateur
°   °   +---stories
°   °   °   +---assets
°   °   °   +---Components
°   °   °   °   +---Accueil
°   °   °   °   +---Simulateur
°   °   °   +---Pages
°   °   °   +---utilitaires
°   °   +---utilitaires
°   +---test
°       +---Services
°       °   +---Simulateur
°       +---utilitaires
+---node_modules
+---pgdata                          // Données container PostgreSQL (ignoré par git)
```

## Mais que se passe-t-il ? (Problèmes courants)

### Erreur récurrente ` FATAL:  no pg_hba.conf entry for host "[local]", user "postgres", database "postgres", no encryption` dans les logs du container anssi-nis2-db

Il s'agit d'un problème de healthcheck : `pg_ready` appel en boucle d'une manière non reconnue dans le fichier
host `pg_hba.conf` de PostgreSQL.

Il suffit de lancer une seule fois ces commandes dans le terminal du container:

```shell
echo >> /var/lib/postgresql/data/pg_hba.conf
echo local postgres postgres trust >> /var/lib/postgresql/data/pg_hba.conf
```

Ceci accepte l'hôte local de `pg_ready` utilisé pour le Healthcheck