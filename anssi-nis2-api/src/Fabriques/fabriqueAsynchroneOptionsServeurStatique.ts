import { fabriqueCheminVersFrontStatique } from "./fabriqueCheminVersFrontStatique";
import { ServeurStaticConfigurableModule } from "../serveur-static-configurable.module";
import { ServeStaticModuleAsyncOptions } from "@nestjs/serve-static";

export const fabriqueAsynchroneOptionsServeurStatique: ServeStaticModuleAsyncOptions =
  {
    useFactory: async () => [
      {
        rootPath: await fabriqueCheminVersFrontStatique(),
        useClass: ServeurStaticConfigurableModule,
      },
    ],
  };
