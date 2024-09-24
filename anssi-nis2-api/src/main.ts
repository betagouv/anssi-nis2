import { creeServeur } from "./serveur";
import { DependanceServeur, ImplementationDuServeur } from "./serveur.types";
import { AdaptateurPersistancePostgres } from "./adaptateurs/adaptateurPersistance.postgres";
import { AdaptateurJournalPostgres } from "./adaptateurs/adaptateurJournal.postgres";
import { AdaptateurCrmBrevo } from "./adaptateurs/adaptateurCrm.brevo";

const { Nest, Express } = ImplementationDuServeur;

const portEcoute = Number(process.env.PORT) || 3000;

const implementation =
  process.env.AVEC_IMPLEMENTATION_EXPRESSJS === "true" ? Express : Nest;

const dependances: DependanceServeur =
  process.env.AVEC_IMPLEMENTATION_EXPRESSJS === "true"
    ? {
        adaptateurPersistance: new AdaptateurPersistancePostgres(),
        adaptateurJournal: new AdaptateurJournalPostgres(),
        adaptateurCrm: new AdaptateurCrmBrevo(
          new URL(process.env.BREVO_API_BASE_URL),
          process.env.BREVO_CLE_API,
        ),
      }
    : null;

creeServeur(portEcoute, implementation, dependances).then((serveur) =>
  serveur.ecoute(() =>
    console.log(`Serveur MonEspaceNIS2 écoute sur le port ${portEcoute}`),
  ),
);
