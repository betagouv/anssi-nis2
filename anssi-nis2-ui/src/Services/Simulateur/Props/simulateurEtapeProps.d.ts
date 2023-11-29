import { DefaultProps } from "../../Props";
import { SimulateurDonneesFormulaireActions } from "./donneesFormulaire";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import { Dispatch } from "react";
import { BoutonsNavigation } from "./boutonsNavigation";
import { EtatEtapes } from "anssi-nis2-domain/src/Simulateur/EtatEtapes.ts";

export interface SimulateurEtapeProps extends DefaultProps {
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur;
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>;
}

export interface SimulateurContenuEtapeProps extends SimulateurEtapeProps {}

export interface SimulateurEtapeRenderedProps extends SimulateurEtapeProps {
  informationsBoutonsNavigation: BoutonsNavigation;
  etatEtapes: EtatEtapes;
}
