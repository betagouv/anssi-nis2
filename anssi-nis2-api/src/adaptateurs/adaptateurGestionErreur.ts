import { Express, NextFunction, Request, Response } from "express";

export interface AdaptateurGestionErreur {
  initialise: (applicationExpress: Express) => void;
  controleurErreurs: (
    erreur: Error,
    requete: Request,
    reponse: Response,
    suite: NextFunction,
  ) => void;
}
