import { DonneesFormulaireSimulateur } from "anssi-nis2-core/src/Domain/Simulateur/DonneesFormulaire";
import { SimulateurReponseService } from "./simulateur-reponse.service";
import { SimulateurReponse } from "./simulateur-reponse.entity";
import { donneesSimulateurVide } from "../Domaine/donneesSimulateur";
import { fabriqueMockRepository } from "../test/utilitaires/facilitateurs";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test } from "@nestjs/testing";

describe("SimulateurReponseService", () => {
  const simulateurReponseJson = JSON.stringify(donneesSimulateurVide);
  const simulateurReponse = {
    ...new SimulateurReponse(),
    reponseJson: simulateurReponseJson,
  };

  const depotSauve = jest.fn(
    async (donneesSimulateur: DonneesFormulaireSimulateur) => donneesSimulateur,
  );
  const depotDonneesSimu = fabriqueMockRepository({
    save: depotSauve,
  });
  const testingModuleBuilder = Test.createTestingModule({
    providers: [
      {
        provide: getRepositoryToken(SimulateurReponse),
        useValue: depotDonneesSimu,
      },
      SimulateurReponseService,
    ],
  });
  beforeEach(() => jest.clearAllMocks());

  it("Doit appeler les repos de réponse formulaire et de trace dans le journal", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const srv = mockModule.get<SimulateurReponseService>(
      SimulateurReponseService,
    );
    const result = await srv.save(donneesSimulateurVide);
    expect(depotDonneesSimu.save).toHaveBeenCalledTimes(1);
    expect(result.reponseJson).toBe(simulateurReponse.reponseJson);
  });
});
