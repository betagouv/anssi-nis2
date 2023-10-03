import { Provider } from "@nestjs/common";
import { ExpressBasicAuthLoader } from "./express-basic-auth.loader";
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
      return new ExpressBasicAuthLoader(
        configService.get("UTILISATEUR_BASIC_AUTH"),
        configService.get("MOT_DE_PASSE_BASIC_AUTH"),
      );
    },
  },
];
