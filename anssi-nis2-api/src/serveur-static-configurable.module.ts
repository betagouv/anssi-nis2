import {
  AbstractLoader,
  SERVE_STATIC_MODULE_OPTIONS,
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ChargeurExpressBasicAuthService } from './chargeur-express-basic-auth.service';

const fournisseurServeurStatique: Provider[] = [
  {
    provide: AbstractLoader,
    useFactory: () => {
      return new ChargeurExpressBasicAuthService();
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
      module: ServeurStaticConfigurableModule,
      providers: [
        {
          provide: SERVE_STATIC_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
