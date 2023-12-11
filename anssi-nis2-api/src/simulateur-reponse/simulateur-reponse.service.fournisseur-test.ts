import { SimulateurReponseService } from "./simulateur-reponse.service";
import { donneesSimulateurVide } from "../Domaine/donneesSimulateur";

export const mockSimulateurReponseService = {
  save: jest.fn().mockReturnValue({
    reponseJson: JSON.stringify(donneesSimulateurVide),
    id: 1,
  }),
};
export const fournisseurTestSimulateurReponseService = {
  provide: SimulateurReponseService,
  useValue: mockSimulateurReponseService,
};
