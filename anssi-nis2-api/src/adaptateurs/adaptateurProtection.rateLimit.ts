import { Express, Request, Response } from "express";
import { AdaptateurProtection } from "./adaptateurProtection";
import { extraisIp } from "../http/requeteHttp";
import rateLimit from "express-rate-limit";
import * as process from "process";

export class AdaptateurProtectionRateLimit implements AdaptateurProtection {
  private routesNonLimitees: string[] = ["/assets", "/dsfr"];

  private configurationRateLimit = (
    duree: string,
    quantite: string,
    cle: string,
  ) => ({
    windowMs: Number(duree) * 1000 || 0,
    max: Number(quantite) || 0,
    keyGenerator: (requete: Request) =>
      `${extraisIp(requete.headers).client}_${cle}`,
    handler: (_requete: Request, reponse: Response) => reponse.end(),
    skip: (requete: Request) =>
      this.routesNonLimitees.some((r) => requete.path.startsWith(r)),
  });

  initialise(applicationExpress: Express) {
    applicationExpress.use(
      rateLimit({
        ...this.configurationRateLimit(
          process.env.LIMITATION_REQUETES_COURTE_DUREE,
          process.env.LIMITATION_REQUETES_COURTE_NOMBRE,
          "COURT",
        ),
      }),
    );
    applicationExpress.use(
      rateLimit({
        ...this.configurationRateLimit(
          process.env.LIMITATION_REQUETES_MOYENNE_DUREE,
          process.env.LIMITATION_REQUETES_MOYENNE_NOMBRE,
          "MOYEN",
        ),
      }),
    );
    applicationExpress.use(
      rateLimit({
        ...this.configurationRateLimit(
          process.env.LIMITATION_REQUETES_LONGUE_DUREE,
          process.env.LIMITATION_REQUETES_LONGUE_NOMBRE,
          "LONG",
        ),
      }),
    );
  }
}
