import { Test } from "@nestjs/testing";
import { SimulateurReponseController } from "./simulateur-reponse.controller";
import { donneesSimulateurVide } from "../Domaine/donneesSimulateur";
import { fournisseurTestJournalService } from "../journal/journal.service.fournisseur-test";
import { fournisseurTestSimulateurReponseService } from "./simulateur-reponse.service.fournisseur-test";

describe("SimulateurReponseController", () => {
  const moduleConstructeur = Test.createTestingModule({
    providers: [
      fournisseurTestSimulateurReponseService,
      fournisseurTestJournalService,
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
