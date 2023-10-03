import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";

describe("Configuration", () => {
  let configService: ConfigService;
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const ValeursConfiguration = {
      UTILISATEUR_BASIC_AUTH: "ValeurUtilisateur",
      MOT_DE_PASSE_BASIC_AUTH: "ValeurMotDePasse",
    };
    const FakeConfigService = {
      provide: ConfigService,
      useValue: {
        get: jest.fn(
          (cleDeConfiguration: string, valeurParDefaut: string) =>
            ValeursConfiguration[cleDeConfiguration] || valeurParDefaut,
        ),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeConfigService],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it("devrait être défini", () => {
    expect(configService).toBeDefined();
  });

  it.each([
    {
      texte: "UTILISATEUR_BASIC_AUTH=",
      cle: "UTILISATEUR_BASIC_AUTH",
      valeurParDefaut: "./",
      valeurAttendue: "ValeurUtilisateur",
    },
    {
      texte: "MOT_DE_PASSE_BASIC_AUTH=",
      cle: "MOT_DE_PASSE_BASIC_AUTH",
      valeurParDefaut: "2000",
      valeurAttendue: "ValeurMotDePasse",
    },
    {
      texte: "avec une valeur par défaut inconnue",
      cle: "NON_TROUVEE",
      valeurParDefaut: "Valeur Par Défaut",
      valeurAttendue: "Valeur Par Défaut",
    },
  ])(
    "devrait retourner une valeur de .env, $texte",
    ({ cle, valeurParDefaut, valeurAttendue }) => {
      const resultat: string = configService.get<string>(cle, valeurParDefaut);
      expect(cle).toBeDefined();
      expect(resultat).toBe(valeurAttendue);
    },
  );
});
