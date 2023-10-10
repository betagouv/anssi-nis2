import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
  ValeurChampSimulateur,
} from "./ValeursChampsSimulateur.ts";
import { Activite } from "./Activite.ts";
import { SecteurActivite } from "./SecteursActivite";
import { SousSecteurActivite } from "./SousSecteurs.ts";

export type NomsChampsSimulateur =
  | "designeOperateurServicesEssentiels"
  | "etatMembre"
  | "typeStructure"
  | "trancheNombreEmployes"
  | "trancheCA"
  | "secteurActivite"
  | "sousSecteurActivite"
  | "activites";

export interface IDonneesFormulaireSimulateur
  extends Record<NomsChampsSimulateur, ValeurChampSimulateur[]> {
  activites: Activite[];
  designeOperateurServicesEssentiels: DesignationOperateurServicesEssentiels[];
  etatMembre: AppartenancePaysUnionEuropeenne[];
  secteurActivite: SecteurActivite[];
  sousSecteurActivite: SousSecteurActivite[];
  trancheCA: TrancheChiffreAffaire[];
  trancheNombreEmployes: TrancheNombreEmployes[];
  typeStructure: TypeStructure[];

  avec(
    modifie: Partial<IDonneesFormulaireSimulateur>,
  ): IDonneesFormulaireSimulateur;
}

export class DonneesFormulaireSimulateur
  implements IDonneesFormulaireSimulateur
{
  activites: Activite[];
  designeOperateurServicesEssentiels: DesignationOperateurServicesEssentiels[];
  etatMembre: AppartenancePaysUnionEuropeenne[];
  secteurActivite: SecteurActivite[];
  sousSecteurActivite: SousSecteurActivite[];
  trancheCA: TrancheChiffreAffaire[];
  trancheNombreEmployes: TrancheNombreEmployes[];
  typeStructure: TypeStructure[];

  constructor(depuis: Partial<IDonneesFormulaireSimulateur>) {
    this.activites = depuis.activites || [];
    this.designeOperateurServicesEssentiels =
      depuis.designeOperateurServicesEssentiels || [];
    this.etatMembre = depuis.etatMembre || [];
    this.secteurActivite = depuis.secteurActivite || [];
    this.sousSecteurActivite = depuis.sousSecteurActivite || [];
    this.trancheCA = depuis.trancheCA || [];
    this.trancheNombreEmployes = depuis.trancheNombreEmployes || [];
    this.typeStructure = depuis.typeStructure || [];
  }

  avec(
    modifie: Partial<IDonneesFormulaireSimulateur>,
  ): IDonneesFormulaireSimulateur {
    return new DonneesFormulaireSimulateur({ ...this, ...modifie });
  }
}

export const donneesFormulaireSimulateurVide: DonneesFormulaireSimulateur =
  new DonneesFormulaireSimulateur({
    designeOperateurServicesEssentiels: [],
    etatMembre: [],
    secteurActivite: [],
    sousSecteurActivite: [],
    trancheCA: [],
    trancheNombreEmployes: [],
    typeStructure: [],
    activites: [],
  });
