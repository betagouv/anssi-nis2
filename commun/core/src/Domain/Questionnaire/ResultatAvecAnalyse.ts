import { ResultatEligibilite } from "../Simulateur/Regulation.definitions";

export type ResultatAvecAnalyse = {
  resultat: ResultatEligibilite;
  specificationsRetenues: string[];
};