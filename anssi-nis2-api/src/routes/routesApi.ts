import * as express from "express";
import { AdaptateurPersistance } from "../adaptateurs/adaptateurPersistance";
import {
  AdaptateurJournal,
  TypeEvenement,
} from "../adaptateurs/adaptateurJournal";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { AdaptateurCrm } from "../adaptateurs/adaptateurCrm";

export const routesApi = ({
  adaptateurPersistance,
  adaptateurJournal,
  adaptateurCrm,
}: {
  adaptateurPersistance: AdaptateurPersistance;
  adaptateurJournal: AdaptateurJournal;
  adaptateurCrm: AdaptateurCrm;
}) => {
  const routes = express.Router();

  routes.post("/simulateur-reponse", async (requete, reponse) => {
    await adaptateurPersistance.sauvegardeReponseFormulaire(requete.body);
    await adaptateurJournal.consigneEvenement<TypeEvenement.ReponseSimulateurRecue>(
      {
        type: TypeEvenement.ReponseSimulateurRecue,
        donnees: requete.body as DonneesFormulaireSimulateur,
        date: new Date(),
      },
    );

    reponse.sendStatus(201);
  });

  routes.post("/informations-emails", async (requete, reponse) => {
    await adaptateurPersistance.sauvegardeInformationsEmail(requete.body);
    await adaptateurCrm.inscrisUtilisateur(requete.body);

    reponse.sendStatus(201);
  });

  return routes;
};
