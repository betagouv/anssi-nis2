import * as express from "express";
import { AdaptateurPersistance } from "../adaptateurs/adaptateurPersistance";
import {
  AdaptateurJournal,
  TypeEvenement,
} from "../adaptateurs/adaptateurJournal";
import { AdaptateurCrm } from "../adaptateurs/adaptateurCrm";
import { AdaptateurEligibilite } from "../adaptateurs/adaptateurEligibilite";

export const routesApi = ({
  adaptateurPersistance,
  adaptateurJournal,
  adaptateurCrm,
  adaptateurEligibilite,
}: {
  adaptateurPersistance: AdaptateurPersistance;
  adaptateurJournal: AdaptateurJournal;
  adaptateurCrm: AdaptateurCrm;
  adaptateurEligibilite: AdaptateurEligibilite;
}) => {
  const routes = express.Router();

  routes.post("/simulateur-reponse", async (requete, reponse) => {
    await adaptateurPersistance.sauvegardeReponseFormulaire(requete.body);
    await adaptateurJournal.consigneEvenement({
      type: TypeEvenement.ReponseSimulateurRecue,
      donnees: adaptateurEligibilite.evalueEligibilite(requete.body),
      date: new Date(),
    });

    reponse.sendStatus(201);
  });

  routes.post("/informations-emails", async (requete, reponse) => {
    await adaptateurPersistance.sauvegardeInformationsEmail(requete.body);
    await adaptateurCrm.inscrisUtilisateur(requete.body);

    reponse.sendStatus(201);
  });

  return routes;
};
