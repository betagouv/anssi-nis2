import { Injectable } from "@nestjs/common";
import { ExpressLoader, ServeStaticModuleOptions } from "@nestjs/serve-static";
import { AbstractHttpAdapter } from "@nestjs/core";
import { loadPackage } from "@nestjs/common/utils/load-package.util";
import { ServeurStatiqueConfigurableModuleToken } from "./serveur-statique-configurable.module";
import { ConfigService } from "@nestjs/config";


export const BasicAuthDesactivee = {_tag:"AuthentificationBasiqueDesactivee"} as const;

export type ConfigurationBasicAuth =
  | {
      readonly _tag: "AuthentificationBasiqueActivee";
      readonly utilisateur: string;
      readonly motDePasse: string;
    }
  | typeof BasicAuthDesactivee;

type ClesConfigurationBasicAuth = {
  UTILISATEUR_BASIC_AUTH?: string;
  MOT_DE_PASSE_BASIC_AUTH?: string;
};

export const fabriqueFournisseurServeurStatique = (
  configService: ConfigService<ClesConfigurationBasicAuth>,
) => {
  const utilisateurbasicauth = configService.get("UTILISATEUR_BASIC_AUTH");
  const motdepassebasicauth = configService.get("MOT_DE_PASSE_BASIC_AUTH");

  if (!utilisateurbasicauth || !motdepassebasicauth) {
    return new ChargeurExpressBasicAuth({...BasicAuthDesactivee });
  }
  return new ChargeurExpressBasicAuth({
    _tag: "AuthentificationBasiqueActivee" as const,
    utilisateur: utilisateurbasicauth,
    motDePasse: motdepassebasicauth,
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

    this.configureAuthentificationBasique(app);

    super.register(httpAdapter, optionsArr);
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
