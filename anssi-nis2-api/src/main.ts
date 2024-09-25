import { creeServeur } from "./serveur";
import { DependanceServeur, ImplementationDuServeur } from "./serveur.types";
import { AdaptateurPersistancePostgres } from "./adaptateurs/adaptateurPersistance.postgres";
import { AdaptateurJournalPostgres } from "./adaptateurs/adaptateurJournal.postgres";
import { AdaptateurCrmBrevo } from "./adaptateurs/adaptateurCrm.brevo";
import { AdaptateurGestionErreurSentry } from "./adaptateurs/adaptateurGestionErreur.sentry";
import { AdaptateurGestionErreurMemoire } from "./adaptateurs/adaptateurGestionErreur.memoire";
import { AdaptateurProtectionRateLimit } from "./adaptateurs/adaptateurProtection.rateLimit";
import { AdaptateurProtectionMemoire } from "./adaptateurs/adaptateurProtection.memoire";

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
        adaptateurGestionErreur: process.env.SENTRY_DSN
          ? new AdaptateurGestionErreurSentry(
              process.env.SENTRY_DSN,
              process.env.SENTRY_ENVIRONNEMENT,
              process.env.SENTRY_CHEMINS_IGNORES_PAR_TRACING?.split(",") ?? [],
              Number(process.env.SENTRY_SAMPLE_RATE_DU_TRACING) || 0,
            )
          : new AdaptateurGestionErreurMemoire(),
        adaptateurProtection: process.env.LIMITATION_REQUETES_COURTE_DUREE
          ? new AdaptateurProtectionRateLimit()
          : new AdaptateurProtectionMemoire(),
      }
    : null;

creeServeur(portEcoute, implementation, dependances).then((serveur) =>
  serveur.ecoute(() =>
    console.log(`Serveur MonEspaceNIS2 écoute sur le port ${portEcoute}`),
  ),
);
