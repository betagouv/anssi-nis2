import { Injectable } from "@nestjs/common";
import { ExpressLoader, ServeStaticModuleOptions } from "@nestjs/serve-static";
import { AbstractHttpAdapter } from "@nestjs/core";
import { loadPackage } from "@nestjs/common/utils/load-package.util";
import { ServeurStatiqueConfigurableModuleToken } from "./serveur-statique-configurable.module";

@Injectable()
export class ExpressBasicAuthLoader extends ExpressLoader {
  constructor(
    private readonly utilisateur: string,
    private readonly motDePasse: string,
  ) {
    super();
  }

  public async register(
    httpAdapter: AbstractHttpAdapter,
    optionsArr: ServeStaticModuleOptions[],
  ) {
    const app = httpAdapter.getInstance();
    const chargeurAuthentificationBasiqueHTTP = () =>
      require("express-basic-auth");
    const basicAuth = loadPackage(
      "basicAuth",
      ServeurStatiqueConfigurableModuleToken,
      chargeurAuthentificationBasiqueHTTP,
    );
    const staticUserAuth = basicAuth({
      users: {
        [this.utilisateur]: this.motDePasse,
      },
      challenge: true,
    });
    app.use("/", staticUserAuth, (req, res, next) => next());

    super.register(httpAdapter, optionsArr);
  }
}
