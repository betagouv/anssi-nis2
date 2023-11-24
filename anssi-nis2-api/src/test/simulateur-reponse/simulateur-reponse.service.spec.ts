import { SimulateurReponseService } from "../../simulateur-reponse/simulateur-reponse.service";
import { SimulateurReponse } from "../../simulateur-reponse/simulateur-reponse.entity";
import { datasourceKey } from "../../constantes";
import { donneesSimulateurVide } from "../../Domaine/donneesSimulateur";
import {
  fabriqueConstructeurTestModule,
  fabriqueMockRepository,
} from "../utilitaires/facilitateurs";
import { DonneesFormulaireSimulateur } from "anssi-nis2-ui/src/Domaine/Simulateur/DonneesFormulaire";

describe("SimulateurReponseService", () => {
  const simulateurReponseJson = JSON.stringify(donneesSimulateurVide);
  const simulateurReponse = {
    ...new SimulateurReponse(),
    reponseJson: simulateurReponseJson,
  };

  const testingModuleBuilder = fabriqueConstructeurTestModule(
    [
      {
        provide: datasourceKey,
        useValue: fabriqueMockRepository({
          save: async (donneesSimulateur: DonneesFormulaireSimulateur) =>
            JSON.stringify(donneesSimulateur),
        }),
      },
      SimulateurReponseService,
    ],
    [SimulateurReponse],
  );

  it("should call repo", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const srv = mockModule.get<SimulateurReponseService>(
      SimulateurReponseService,
    );
    const result = await srv.save(donneesSimulateurVide);
    expect(result.id).not.toBeNaN();
    expect(result.reponseJson).toBe(simulateurReponse.reponseJson);
  });
});
