import { creeServeur } from "./serveur";

creeServeur().then((serveur) => serveur.ecoute());
