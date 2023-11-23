import { AbstractHttpAdapter } from "@nestjs/core";
import { ServeStaticModuleOptions } from "@nestjs/serve-static";
import {
  BasicAuthDesactivee,
  ChargeurExpressBasicAuth,
  fabriqueFournisseurServeurStatique,
} from "../../intergiciels/serveur-statique-configurable/chargeur-express-basic.auth";
import { createMock } from "@golevelup/ts-jest";
import { fabriqueConfigService } from "../utilitaires/helpers";

describe(ChargeurExpressBasicAuth, () => {
  const configurationParDefaut = {
    utilisateur: "username",
    motDePasse: "password",
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("devrait charger le middleware quand un login et un mot de passe sont passés en paramètre", () => {
    const httpAdapter = createMock<AbstractHttpAdapter>();

    const optionsArr: ServeStaticModuleOptions[] = [];
    const app = createMock<AbstractHttpAdapter>();

    const basicAuth = jest.fn();
    const chargeurAuthentificationBasiqueHTTP = jest
      .fn()
      .mockReturnValue(basicAuth);

    jest.doMock("express-basic-auth", chargeurAuthentificationBasiqueHTTP);
    const expressBasicAuthLoader = new ChargeurExpressBasicAuth(
      configurationParDefaut,
    );
    httpAdapter.getInstance.mockReturnValue(app);

    expressBasicAuthLoader.register(httpAdapter, optionsArr);

    expect(chargeurAuthentificationBasiqueHTTP).toHaveBeenCalled();
    expect(basicAuth).toHaveBeenCalledWith({
      users: {
        [configurationParDefaut.utilisateur]: configurationParDefaut.motDePasse,
      },
      challenge: true,
    });
    expect(app.use).toHaveBeenCalledWith("/", undefined, expect.any(Function));
  });

  it("ne devrait pas charger le middleware quand la basic auth n'est pas activée", () => {
    const httpAdapter = createMock<AbstractHttpAdapter>();

    const optionsArr: ServeStaticModuleOptions[] = [];
    const app = createMock<AbstractHttpAdapter>();

    const basicAuth = jest.fn();
    const chargeurAuthentificationBasiqueHTTP = jest
      .fn()
      .mockReturnValue(basicAuth);

    jest.doMock("express-basic-auth", chargeurAuthentificationBasiqueHTTP);
    const expressBasicAuthLoader = new ChargeurExpressBasicAuth(
      BasicAuthDesactivee,
    );
    httpAdapter.getInstance.mockReturnValue(app);

    expressBasicAuthLoader.register(httpAdapter, optionsArr);

    expect(chargeurAuthentificationBasiqueHTTP).not.toHaveBeenCalled();
    expect(basicAuth).not.toHaveBeenCalled();
    expect(app.use).not.toHaveBeenCalled();
  });

  describe("configuration du chargeur", () => {
    const valeursConfigurationChainesVides = {
      UTILISATEUR_BASIC_AUTH: "",
      MOT_DE_PASSE_BASIC_AUTH: "",
    };
    afterEach(() => {
      jest.clearAllMocks();
    });

    const getChargeurAuthentificationBasiqueHTTP = (basicAuth: jest.Mock) => {
      const chargeurAuthentificationBasiqueHTTP = jest
        .fn()
        .mockReturnValue(basicAuth);
      jest.doMock("express-basic-auth", chargeurAuthentificationBasiqueHTTP);
      return chargeurAuthentificationBasiqueHTTP;
    };

    const fabriqueFauxHttpAdapter = (app: AbstractHttpAdapter) => {
      const httpAdapter = createMock<AbstractHttpAdapter>();
      httpAdapter.getInstance.mockReturnValue(app);
      return httpAdapter;
    };

    it.each([
      {
        description: "les 2 clés sont vides",
        valeursConfiguration: valeursConfigurationChainesVides,
      },
      {
        description: "le mot de passe est vide",
        valeursConfiguration: {
          ...valeursConfigurationChainesVides,
          UTILISATEUR_BASIC_AUTH: "utilisateur",
        },
      },
      {
        description: "l'utilisateur est vide",
        valeursConfiguration: {
          ...valeursConfigurationChainesVides,
          MOT_DE_PASSE_BASIC_AUTH: "mot de passe",
        },
      },
      {
        description: "l'utilisateur est absent",
        valeursConfiguration: {
          MOT_DE_PASSE_BASIC_AUTH: "mot de passe",
        },
      },
    ])(
      "ne devrait pas charger le middleware quand $description",
      async ({ valeursConfiguration }) => {
        const configService = await fabriqueConfigService(valeursConfiguration);
        const app = createMock<AbstractHttpAdapter>();

        const httpAdapter = fabriqueFauxHttpAdapter(app);

        const basicAuth = jest.fn();
        const chargeurAuthentificationBasiqueHTTP =
          getChargeurAuthentificationBasiqueHTTP(basicAuth);
        const expressBasicAuthLoader =
          fabriqueFournisseurServeurStatique(configService);

        await expressBasicAuthLoader.register(httpAdapter, []);

        expect(chargeurAuthentificationBasiqueHTTP).not.toHaveBeenCalled();
        expect(basicAuth).not.toHaveBeenCalled();
        expect(app.use).not.toHaveBeenCalled();
      },
    );
  });
});
