import { Test } from "@nestjs/testing";
import { donneesFormulaireSimulateurVide } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes";
import { fournisseurTestJournalService } from "../journal/journal.service.fournisseur-test";
import { SimulateurReponseController } from "./simulateur-reponse.controller";
import { fournisseurTestSimulateurReponseService } from "./simulateur-reponse.service.fournisseur-test";
import { SimulateurReponseService } from "./simulateur-reponse.service";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { SimulateurReponse } from "./simulateur-reponse.entity";

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

  describe("sur la route POST /simulateur-reponse", () => {
    it("persiste les données reçues en utilisant le service dédié", async () => {
      let donneesEnregistrees: DonneesFormulaireSimulateur;
      const serviceEnMemoire = {
        async save(
          reponses: DonneesFormulaireSimulateur,
        ): Promise<SimulateurReponse> {
          donneesEnregistrees = reponses;
          return { id: 1, reponseJson: "" };
        },
      };

      const module = await Test.createTestingModule({
        providers: [
          { provide: SimulateurReponseService, useValue: serviceEnMemoire },
          fournisseurTestJournalService,
        ],
        controllers: [SimulateurReponseController],
      }).compile();

      const controleur = module.get(SimulateurReponseController);

      await controleur.enregistreDonneesSimulateur(
        donneesFormulaireSimulateurVide,
      );

      expect(donneesEnregistrees).toEqual(donneesFormulaireSimulateurVide);
    });
  });
});
