import { useContext } from "react";
import { AppContext } from "./AppContext.definition.ts";

export const useReducteurDonneesFormulaireDuContexte = () => {
  const {
    simulateur: { reducteurDonneesFormulaire },
  } = useContext(AppContext);
  return reducteurDonneesFormulaire;
};
