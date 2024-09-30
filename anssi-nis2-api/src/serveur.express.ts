import * as http from "node:http";
import * as express from "express";
import { DependanceServeur, ServeurMonEspaceNIS2 } from "./serveur.types";
import { join } from "path";
import { IpFilter } from "express-ipfilter";
import { Express } from "express";
import { extraisIp } from "./http/requeteHttp";
import { routesApi } from "./routes/routesApi";

export async function creeServeurExpress(
  port: number,
  dependances: DependanceServeur,
): Promise<ServeurMonEspaceNIS2> {
  const app = express();

  dependances.adaptateurGestionErreur.initialise(app);
  dependances.adaptateurProtection.initialise(app);

  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  activeFiltrageIp(app);

  app.use(express.static(appReact().cheminDuBuild()));
  app.use("/statique", express.static(join(__dirname, "../../../statique")));
  app.use(express.json());

  app.use("/api", routesApi({ ...dependances }));

  // Matcher "*" en dernier pour que le routing React fonctionne
  app.get("*", (_req, res) => res.sendFile(appReact().fichierIndex()));

  app.use(dependances.adaptateurGestionErreur.controleurErreurs);

  let serveur: http.Server;
  return {
    ecoute: (callbackSucces) => {
      serveur = app.listen(port, callbackSucces);
    },
    arrete: () => serveur.close(),
  };
}

const activeFiltrageIp = (app: Express) => {
  const ipAutorisees = process.env.ADRESSES_IP_AUTORISEES?.split(",") ?? [];
  const activerFiltrageIp = ipAutorisees.length > 0;

  if (!activerFiltrageIp) return;

  app.use(
    IpFilter(ipAutorisees, {
      detectIp: (requete) => extraisIp(requete).waf,
      mode: "allow",
      log: false,
    }),
  );
};

const appReact = () => {
  const cheminVersUi = join(__dirname, "../../../../anssi-nis2-ui/dist");
  return {
    cheminDuBuild: () => cheminVersUi,
    fichierIndex: () => join(cheminVersUi, "index.html"),
  };
};
