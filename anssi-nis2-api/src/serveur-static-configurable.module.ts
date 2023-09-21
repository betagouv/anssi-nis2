import {
  AbstractLoader,
  ServeStaticModule,
  ServeStaticModuleAsyncOptions,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExpressBasicAuthLoader } from './express-basic-auth.loader';

const fournisseurServeurStatique: Provider[] = [
  {
    provide: AbstractLoader,
    useFactory: () => {
      return new ExpressBasicAuthLoader();
    },
    inject: [HttpAdapterHost],
  },
];

@Module({
  providers: [...fournisseurServeurStatique],
})
export class ServeurStaticConfigurableModule extends ServeStaticModule {
  public static forRoot(...options: ServeStaticModuleOptions[]): DynamicModule {
    return {
      ...ServeStaticModule.forRoot(...options),
      module: ServeurStaticConfigurableModule,
    };
  }

  public static forRootAsync(
    options: ServeStaticModuleAsyncOptions,
  ): DynamicModule {
    return {
      ...ServeStaticModule.forRootAsync(options),
      module: ServeurStaticConfigurableModule,
    };
  }
}
