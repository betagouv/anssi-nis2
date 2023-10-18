import { useContext } from "react";
import { AppContext } from "../../AppContext.tsx";

export const useReducteurDonneesFormulaireDuContexte = () => {
  const {
    simulateur: { reducteurDonneesFormulaire },
  } = useContext(AppContext);

  return reducteurDonneesFormulaire;
};
