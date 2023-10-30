import { DefaultProps } from "../../Props";
import { SimulateurDonneesFormulaireActions } from "./donneesFormulaire";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { Dispatch } from "react";
import { BoutonsNavigation } from "./boutonsNavigation";
import { EtatEtapes } from "../EtatEtapes.ts";

export interface SimulateurEtapeProps extends DefaultProps {
  donneesFormulaire: DonneesFormulaireSimulateur;
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
}

export interface SimulateurContenuEtapeProps extends SimulateurEtapeProps {}

export interface SimulateurEtapeRenderedProps extends SimulateurEtapeProps {
  informationsBoutonsNavigation: BoutonsNavigation;
  etatEtapes: EtatEtapes;
}
