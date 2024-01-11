import {
  EnregistreInformationsEmail,
  EnvoieDonneesFormulaire,
} from "./Simulateur/Operations/appelsApi";
import { IDonneesBrutesFormulaireSimulateur } from "../Domaine/Simulateur/DonneesFormulaire.definitions.ts";
import { SimulateurDonneesFormulaireActions } from "./Simulateur/Props/donneesFormulaire";
import { BoutonsNavigation } from "./Simulateur/Props/boutonsNavigation.d.ts";
import { ActionsBoutonNavigation } from "./Simulateur/Reducteurs.ts";
import { Reducer } from "react";

export type Contexte = {
  envoieDonneesFormulaire: EnvoieDonneesFormulaire;
  enregistreInformationsEmail: EnregistreInformationsEmail;
  simulateur: {
    reducteurDonneesFormulaire: Reducer<
      IDonneesBrutesFormulaireSimulateur,
      SimulateurDonneesFormulaireActions
    >;
    reducteurActionsBoutonNavigation: Reducer<
      BoutonsNavigation,
      ActionsBoutonNavigation
    >;
  };
};
