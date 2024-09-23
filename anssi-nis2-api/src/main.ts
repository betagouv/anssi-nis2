import { creeServeur } from "./serveur";
import { ImplementationDuServeur } from "./serveur.types";
const { Nest, Express } = ImplementationDuServeur;

const portEcoute = Number(process.env.PORT) || 3000;

const implementation =
  process.env.AVEC_IMPLEMENTATION_EXPRESSJS === "true" ? Express : Nest;

creeServeur(portEcoute, implementation).then((serveur) => serveur.ecoute());
