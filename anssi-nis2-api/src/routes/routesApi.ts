import * as express from "express";
import { AdaptateurPersistance } from "../adaptateurs/adaptateurPersistance";
import { AdaptateurJournal } from "../adaptateurs/adaptateurJournal";

export const routesApi = ({
  adaptateurPersistance,
  adaptateurJournal,
}: {
  adaptateurPersistance: AdaptateurPersistance;
  adaptateurJournal: AdaptateurJournal;
}) => {
  const routes = express.Router();

  routes.post("/simulateur-reponse", async (requete, reponse) => {
    await adaptateurPersistance.sauvegardeReponseFormulaire(requete.body);
    await adaptateurJournal.consigneReponseSimulateur(requete.body);

    reponse.sendStatus(201);
  });

  return routes;
};
