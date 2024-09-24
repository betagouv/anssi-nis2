import { creeServeur } from "./serveur";
import { DependanceServeur, ImplementationDuServeur } from "./serveur.types";
import { AdaptateurPersistancePostgres } from "./adaptateurs/adaptateurPersistance.postgres";
import { AdaptateurJournalMemoire } from "./adaptateurs/adaptateurJournal.memoire";
const { Nest, Express } = ImplementationDuServeur;

const portEcoute = Number(process.env.PORT) || 3000;

const implementation =
  process.env.AVEC_IMPLEMENTATION_EXPRESSJS === "true" ? Express : Nest;

const dependances: DependanceServeur =
  process.env.AVEC_IMPLEMENTATION_EXPRESSJS === "true"
    ? {
        adaptateurPersistance: new AdaptateurPersistancePostgres(),
        adaptateurJournal: new AdaptateurJournalMemoire(),
      }
    : null;

creeServeur(portEcoute, implementation, dependances).then((serveur) =>
  serveur.ecoute(() =>
    console.log(`Serveur MonEspaceNIS2 écoute sur le port ${portEcoute}`),
  ),
);
