import { Injectable } from "@nestjs/common";
import { ExpressLoader, ServeStaticModuleOptions } from "@nestjs/serve-static";
import { AbstractHttpAdapter } from "@nestjs/core";
import { loadPackage } from "@nestjs/common/utils/load-package.util";
import { ServeurStatiqueConfigurableModuleToken } from "./serveur-statique-configurable.module";

const motDePasseAuthentificationBasiqueHTTP = async () =>
  process.env.MOT_DE_PASSE_NIS2_BASIC_AUTH;
const utilisateurAuthitificationBasiqueHTTP = async () => "NIS2";

@Injectable()
export class ExpressBasicAuthLoader extends ExpressLoader {
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
        [await utilisateurAuthitificationBasiqueHTTP()]:
          await motDePasseAuthentificationBasiqueHTTP(),
      },
      challenge: true,
    });
    app.use("/", staticUserAuth, (req, res, next) => next());

    super.register(httpAdapter, optionsArr);
  }
}
