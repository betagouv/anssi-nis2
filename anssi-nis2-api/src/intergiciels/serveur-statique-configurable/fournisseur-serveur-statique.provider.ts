import { Provider } from "@nestjs/common";
import { fabriqueFournisseurServeurStatique } from "./chargeur-express-basic.auth";
import { AbstractLoader } from "@nestjs/serve-static";
import { HttpAdapterHost } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

export const fournisseurServeurStatique: Provider[] = [
  {
    inject: [ConfigService, HttpAdapterHost],
    provide: AbstractLoader,
    useFactory: fabriqueFournisseurServeurStatique,
  },
];
