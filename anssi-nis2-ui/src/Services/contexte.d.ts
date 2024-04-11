import {
  EnregistreInformationsEmail,
  EnvoieDonneesFormulaire,
} from "./Simulateur/Operations/appelsApi";
import { IDonneesBrutesFormulaireSimulateur } from "../Domaine/Simulateur/DonneesFormulaire.definitions.ts";
import { SimulateurDonneesFormulaireActions } from "./Simulateur/Props/donneesFormulaire";
import { Reducer } from "react";

export type Contexte = {
  envoieDonneesFormulaire: EnvoieDonneesFormulaire;
  enregistreInformationsEmail: EnregistreInformationsEmail;
  simulateur: {
    reducteurDonneesFormulaire: Reducer<
      IDonneesBrutesFormulaireSimulateur,
      SimulateurDonneesFormulaireActions
    >;
  };
};
