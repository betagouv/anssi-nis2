import { Provider } from "@nestjs/common";
import { ChargeurExpressBasicAuth } from "./chargeur-express-basic.auth";
import { AbstractLoader } from "@nestjs/serve-static";
import { HttpAdapterHost } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

export const fournisseurServeurStatique: Provider[] = [
  {
    inject: [ConfigService, HttpAdapterHost],
    provide: AbstractLoader,
    useFactory: (
      configService: ConfigService<{
        UTILISATEUR_BASIC_AUTH: string;
        MOT_DE_PASSE_BASIC_AUTH: string;
      }>,
    ) => {
      return new ChargeurExpressBasicAuth({
        utilisateur: configService.get("UTILISATEUR_BASIC_AUTH"),
        motDePasse: configService.get("MOT_DE_PASSE_BASIC_AUTH"),
      });
    },
  },
];
