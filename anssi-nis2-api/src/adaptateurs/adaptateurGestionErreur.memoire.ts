import { Request, Response, NextFunction } from "express";
import { AdaptateurGestionErreur } from "./adaptateurGestionErreur";

export class AdaptateurGestionErreurMemoire implements AdaptateurGestionErreur {
  initialise() {
    return;
  }

  controleurErreurs(
    erreur: Error,
    _requete: Request,
    _reponse: Response,
    suite: NextFunction,
  ) {
    suite(erreur);
  }
}
