import { Test } from "@nestjs/testing";
import { SimulateurReponseController } from "./simulateur-reponse.controller";
import { donneesSimulateurVide } from "../Domaine/donneesSimulateur";
import { SimulateurReponseService } from "./simulateur-reponse.service";

const mockSimulateurReponseService = {
  save: jest.fn().mockReturnValue({
    reponseJson: JSON.stringify(donneesSimulateurVide),
    id: 1,
  }),
};
describe("SimulateurReponseController", () => {
  const moduleConstructeur = Test.createTestingModule({
    providers: [
      {
        provide: SimulateurReponseService,
        useValue: mockSimulateurReponseService,
      },
    ],
    controllers: [SimulateurReponseController],
  });
  const simulateurReponseJson = JSON.stringify(donneesSimulateurVide);

  it('should return "OK"', async () => {
    const module = await moduleConstructeur.compile();
    const controller = module.get<SimulateurReponseController>(
      SimulateurReponseController,
    );
    expect(
      await controller.enregistreDonneesSimulateur(donneesSimulateurVide),
    ).toBe(simulateurReponseJson);
  });
});
