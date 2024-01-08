import { Test } from "@nestjs/testing";
import { donneesFormulaireSimulateurVide } from "~core/src/Domain/Simulateur/DonneesFormulaire.constantes";
import { fournisseurTestJournalService } from "../journal/journal.service.fournisseur-test";
import { SimulateurReponseController } from "./simulateur-reponse.controller";
import { fournisseurTestSimulateurReponseService } from "./simulateur-reponse.service.fournisseur-test";

describe("SimulateurReponseController", () => {
  const moduleConstructeur = Test.createTestingModule({
    providers: [
      fournisseurTestSimulateurReponseService,
      fournisseurTestJournalService,
    ],
    controllers: [SimulateurReponseController],
  });
  const simulateurReponseJson = JSON.stringify(donneesFormulaireSimulateurVide);

  it('should return "OK"', async () => {
    const module = await moduleConstructeur.compile();
    const controller = module.get<SimulateurReponseController>(
      SimulateurReponseController,
    );
    expect(
      await controller.enregistreDonneesSimulateur(
        donneesFormulaireSimulateurVide,
      ),
    ).toBe(simulateurReponseJson);
  });
});
