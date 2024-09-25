import { Express, Request, Response, NextFunction } from "express";
import { AdaptateurGestionErreur } from "./adaptateurGestionErreur";
import * as Sentry from "@sentry/node";

export class AdaptateurGestionErreurSentry implements AdaptateurGestionErreur {
  constructor(
    private readonly dsn: string,
    private readonly environnement: string,
    private readonly cheminsIgnoresParTracing: string[],
    private readonly sampleRate: number,
  ) {}

  initialise(applicationExpress: Express) {
    Sentry.init({
      dsn: this.dsn,
      environment: this.environnement,
      integrations: [
        new Sentry.Integrations.Express({ app: applicationExpress }),
        new Sentry.Integrations.Postgres(),
        ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
      ],
      ignoreTransactions: this.cheminsIgnoresParTracing,
      tracesSampleRate: this.sampleRate,
    });

    applicationExpress.use(Sentry.Handlers.requestHandler());
    applicationExpress.use(Sentry.Handlers.tracingHandler());
  }

  controleurErreurs(
    erreur: Error,
    requete: Request,
    reponse: Response,
    suite: NextFunction,
  ) {
    return Sentry.Handlers.errorHandler()(erreur, requete, reponse, suite);
  }
}
