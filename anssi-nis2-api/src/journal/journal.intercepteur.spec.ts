import { Test } from "@nestjs/testing";
import { donneesFormulaireSimulateurVide } from "~core/src/Domain/Simulateur/DonneesFormulaire.constantes";
import { SimulateurReponseController } from "../simulateur-reponse/simulateur-reponse.controller";
import { SimulateurReponseService } from "../simulateur-reponse/simulateur-reponse.service";
import { JournalIntercepteur } from "./journal.intercepteur";
import { fournisseurTestJournalService } from "./journal.service.fournisseur-test";

describe(JournalIntercepteur, () => {
  const mockSimulateurReponseService = {
    save: jest.fn().mockReturnValue({
      reponseJson: JSON.stringify(donneesFormulaireSimulateurVide),
      id: 1,
    }),
  };
  // const intercepteurJournal = new JournalIntercepteur();
  const moduleConstructeur = Test.createTestingModule({
    providers: [
      {
        provide: SimulateurReponseService,
        useValue: mockSimulateurReponseService,
      },
      fournisseurTestJournalService,
    ],
    controllers: [SimulateurReponseController],
  });
  // const simulateurReponseJson = JSON.stringify(donneesSimulateurVide);
  it("should call intercepter", async () => {
    const module = await moduleConstructeur.compile();
    const controller = module.get<SimulateurReponseController>(
      SimulateurReponseController,
    );
    // const mockHandler: CallHandler = {
    //   handle: jest.fn(),
    // };
    // const mockExecutionContext = {} as unknown as ExecutionContext;
    await controller.enregistreDonneesSimulateur(
      donneesFormulaireSimulateurVide,
    );
    // expect();
  });
});
