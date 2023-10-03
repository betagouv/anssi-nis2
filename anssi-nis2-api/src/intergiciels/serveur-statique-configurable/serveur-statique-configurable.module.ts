import {
  ServeStaticModule,
  ServeStaticModuleAsyncOptions,
  ServeStaticModuleOptions,
} from "@nestjs/serve-static";
import { DynamicModule, Module } from "@nestjs/common";
import { fournisseurServeurStatique } from "./fournisseur-serveur-statique.provider";

@Module({
  providers: [...fournisseurServeurStatique],
})
export class ServeurStatiqueConfigurableModule extends ServeStaticModule {
  public static forRoot(...options: ServeStaticModuleOptions[]): DynamicModule {
    return {
      ...ServeStaticModule.forRoot(...options),
      module: ServeurStatiqueConfigurableModule,
    };
  }

  public static forRootAsync(
    options: ServeStaticModuleAsyncOptions,
  ): DynamicModule {
    return {
      ...ServeStaticModule.forRootAsync(options),
      module: ServeurStatiqueConfigurableModule,
    };
  }
}

export const ServeurStatiqueConfigurableModuleToken =
  ServeurStatiqueConfigurableModule.name;
