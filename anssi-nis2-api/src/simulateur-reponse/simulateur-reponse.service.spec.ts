import { SimulateurReponseService } from "./simulateur-reponse.service";
import { SimulateurReponse } from "./entites/simulateur-reponse.entity";
import { donneesSimulateurVide } from "../Domaine/donneesSimulateur";
import { fabriqueMockRepository } from "../test/utilitaires/facilitateurs";
import { DonneesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test } from "@nestjs/testing";

describe("SimulateurReponseService", () => {
  const simulateurReponseJson = JSON.stringify(donneesSimulateurVide);
  const simulateurReponse = {
    ...new SimulateurReponse(),
    reponseJson: simulateurReponseJson,
  };

  const testingModuleBuilder = Test.createTestingModule({
    providers: [
      {
        provide: getRepositoryToken(SimulateurReponse),
        useValue: fabriqueMockRepository({
          save: async (donneesSimulateur: DonneesFormulaireSimulateur) =>
            donneesSimulateur,
        }),
      },
      SimulateurReponseService,
    ],
  });

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
