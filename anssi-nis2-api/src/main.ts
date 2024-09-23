import { creeServeur } from "./serveur";

const portEcoute = Number(process.env.PORT) || 3000;

creeServeur(portEcoute).then((serveur) => serveur.ecoute());
