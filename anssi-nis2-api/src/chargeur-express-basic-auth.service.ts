import { Injectable } from '@nestjs/common';
import { ExpressLoader, ServeStaticModuleOptions } from '@nestjs/serve-static';
import { AbstractHttpAdapter } from '@nestjs/core';
import { loadPackage } from '@nestjs/common/utils/load-package.util';

@Injectable()
export class ChargeurExpressBasicAuthService extends ExpressLoader {
  public register(
    httpAdapter: AbstractHttpAdapter,
    optionsArr: ServeStaticModuleOptions[],
  ) {
    const app = httpAdapter.getInstance();
    const basicAuth = loadPackage('basicAuth', 'MyServeStaticModule', () =>
      require('express-basic-auth'),
    );
    const password = process.env.PASSWORD_NIS2_BASIC_AUTH || 'truc';
    const staticUserAuth = basicAuth({
      users: { NIS2: password },
      challenge: true,
    });
    app.use('/', staticUserAuth, (req, res, next) => next());

    super.register(httpAdapter, optionsArr);
  }
}
