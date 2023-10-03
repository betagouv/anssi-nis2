import { fabriqueCheminVersFrontStatique } from "./fabriqueCheminVersFrontStatique";
import { ServeurStatiqueConfigurableModule } from "../intergiciels/serveur-statique-configurable/serveur-statique-configurable.module";
import { ServeStaticModuleAsyncOptions } from "@nestjs/serve-static";

export const fabriqueAsynchroneOptionsServeurStatique: ServeStaticModuleAsyncOptions =
  {
    useFactory: async () => [
      {
        rootPath: await fabriqueCheminVersFrontStatique(),
        useClass: ServeurStatiqueConfigurableModule,
      },
    ],
  };
