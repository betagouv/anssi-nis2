import { Injectable } from "@nestjs/common";
import { ExpressLoader, ServeStaticModuleOptions } from "@nestjs/serve-static";
import { AbstractHttpAdapter } from "@nestjs/core";
import { loadPackage } from "@nestjs/common/utils/load-package.util";
import { ServeurStatiqueConfigurableModuleToken } from "./serveur-statique-configurable.module";
import { ConfigService } from "@nestjs/config";


export const BasicAuthDesactivee = {_tag:"AuthentificationBasiqueDesactivee", listeBlancheIp: ".*"} as const;

export type ConfigurationBasicAuth =
  | {
      readonly _tag: "AuthentificationBasiqueActivee";
      readonly utilisateur: string;
      readonly motDePasse: string;
      readonly listeBlancheIp: string;
    }
  | typeof BasicAuthDesactivee;

type ClesConfigurationBasicAuth = {
  UTILISATEUR_BASIC_AUTH?: string;
  MOT_DE_PASSE_BASIC_AUTH?: string;
  LISTE_BLANCHE_IP?: string;
};

export const fabriqueFournisseurServeurStatique = (
  configService: ConfigService<ClesConfigurationBasicAuth>,
) => {
  const utilisateurbasicauth = configService.get("UTILISATEUR_BASIC_AUTH");
  const motdepassebasicauth = configService.get("MOT_DE_PASSE_BASIC_AUTH");
  const listeBlancheIp = configService.get("LISTE_BLANCHE_IP", "^.*");

  if (!utilisateurbasicauth || !motdepassebasicauth) {
    return new ChargeurExpressBasicAuth({...BasicAuthDesactivee,listeBlancheIp:listeBlancheIp
  });
  }
  return new ChargeurExpressBasicAuth({
    _tag: "AuthentificationBasiqueActivee" as const,
    utilisateur: utilisateurbasicauth,
    motDePasse: motdepassebasicauth,
    listeBlancheIp:listeBlancheIp
  });
};

type ExpressApp = {
  use: (
      uri: string,
      ...middleware: unknown[]
  ) => void;
}

@Injectable()
export class ChargeurExpressBasicAuth extends ExpressLoader {

  constructor(private readonly configuration: ConfigurationBasicAuth) {
    super();
  }

  public async register(
    httpAdapter: AbstractHttpAdapter,
    optionsArr: ServeStaticModuleOptions[],
  ) {
    const app = httpAdapter.getInstance();

    this.configureFiltrageIp(app);
    this.configureAuthentificationBasique(app);

    super.register(httpAdapter, optionsArr);
  }

  private configureFiltrageIp(app: ExpressApp) {
    const filtrageIP = (requete, reponse, suite) => {
      const listeBlanche = this.configuration.listeBlancheIp.split(";");
      const ip = requete.headers['x-real-ip'];

      if (!listeBlanche.some(whitelist => (RegExp(whitelist).test(ip)))) {
        reponse.sendStatus(403);
        return;
      }
      suite();
    }
    app.use("/", filtrageIP);
  }

  private configureAuthentificationBasique(app: ExpressApp) {
    if (this.configuration._tag !== "AuthentificationBasiqueDesactivee") {
      const chargeurAuthentificationBasiqueHTTP = () =>
        require("express-basic-auth");
      const basicAuth = loadPackage(
        "basicAuth",
        ServeurStatiqueConfigurableModuleToken,
        chargeurAuthentificationBasiqueHTTP,
      );
      const staticUserAuth = basicAuth({
        users: {
          [this.configuration.utilisateur]: this.configuration.motDePasse,
        },
        challenge: true,
      });

      app.use("/", staticUserAuth, (_, __, next) => next());
    }
  }
}
