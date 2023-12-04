import { JournalIntercepteur } from "./journal.intercepteur";
import { Test } from "@nestjs/testing";
import { SimulateurReponseService } from "../simulateur-reponse/simulateur-reponse.service";
import { SimulateurReponseController } from "../simulateur-reponse/simulateur-reponse.controller";
import { donneesSimulateurVide } from "../Domaine/donneesSimulateur";

describe(JournalIntercepteur, () => {
  const mockSimulateurReponseService = {
    save: jest.fn().mockReturnValue({
      reponseJson: JSON.stringify(donneesSimulateurVide),
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
    await controller.enregistreDonneesSimulateur(donneesSimulateurVide);
    // expect();
  });
});
