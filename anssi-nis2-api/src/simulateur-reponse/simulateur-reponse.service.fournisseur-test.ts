import { donneesFormulaireSimulateurVide } from "~core/src/Domain/Simulateur/DonneesFormulaire.constantes";
import { SimulateurReponseService } from "./simulateur-reponse.service";

export const mockSimulateurReponseService = {
  save: jest.fn().mockReturnValue({
    reponseJson: JSON.stringify(donneesFormulaireSimulateurVide),
    id: 1,
  }),
};
export const fournisseurTestSimulateurReponseService = {
  provide: SimulateurReponseService,
  useValue: mockSimulateurReponseService,
};
