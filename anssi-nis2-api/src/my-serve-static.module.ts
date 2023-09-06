import {
  AbstractLoader,
  SERVE_STATIC_MODULE_OPTIONS,
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MyExpressLoader } from './my-express.loader';

const serveStaticProviders: Provider[] = [
  {
    provide: AbstractLoader,
    useFactory: () => {
      return new MyExpressLoader();
    },
    inject: [HttpAdapterHost],
  },
];

@Module({
  providers: [...serveStaticProviders],
})
export class MyServeStaticModule extends ServeStaticModule {
  public static forRoot(...options: ServeStaticModuleOptions[]): DynamicModule {
    return {
      module: MyServeStaticModule,
      providers: [
        {
          provide: SERVE_STATIC_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
