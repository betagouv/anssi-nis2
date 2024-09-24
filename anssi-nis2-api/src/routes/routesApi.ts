import * as express from "express";
import { AdaptateurPersistance } from "../adaptateurs/adaptateurPersistance";

export const routesApi = ({
  adaptateurPersistance,
}: {
  adaptateurPersistance: AdaptateurPersistance;
}) => {
  const routes = express.Router();

  routes.post("/simulateur-reponse", async (requete, reponse) => {
    await adaptateurPersistance.sauvegardeReponseFormulaire(requete.body);
    reponse.sendStatus(201);
  });

  return routes;
};
