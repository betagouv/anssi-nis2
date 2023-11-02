import { SecteurActivite } from "./SecteurActivite.definitions.ts";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions.ts";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
  ValeurChampSimulateur,
} from "./ChampsSimulateur.definitions.ts";
import { ValeursActivites } from "./Activite.definitions.ts";

export type NomsChampsSimulateur =
  | "designeOperateurServicesEssentiels"
  | "etatMembre"
  | "typeStructure"
  | "trancheNombreEmployes"
  | "trancheCA"
  | "secteurActivite"
  | "sousSecteurActivite"
  | "activites";

export interface IDonneesBrutesFormulaireSimulateur
  extends Record<NomsChampsSimulateur, ValeurChampSimulateur[]> {
  activites: ValeursActivites[];
  designeOperateurServicesEssentiels: DesignationOperateurServicesEssentiels[];
  etatMembre: AppartenancePaysUnionEuropeenne[];
  secteurActivite: SecteurActivite[];
  sousSecteurActivite: SousSecteurActivite[];
  trancheCA: TrancheChiffreAffaire[];
  trancheNombreEmployes: TrancheNombreEmployes[];
  typeStructure: TypeStructure[];
}

export interface IDonneesFormulaireSimulateur
  extends IDonneesBrutesFormulaireSimulateur {
  avec(
    modifie: Partial<IDonneesFormulaireSimulateur>,
  ): IDonneesFormulaireSimulateur;
}

export class DonneesFormulaireSimulateur
  implements IDonneesFormulaireSimulateur
{
  activites: ValeursActivites[] = [];
  designeOperateurServicesEssentiels: DesignationOperateurServicesEssentiels[] =
    [];
  etatMembre: AppartenancePaysUnionEuropeenne[] = [];
  secteurActivite: SecteurActivite[] = [];
  sousSecteurActivite: SousSecteurActivite[] = [];
  trancheCA: TrancheChiffreAffaire[] = [];
  trancheNombreEmployes: TrancheNombreEmployes[] = [];
  typeStructure: TypeStructure[] = [];

  constructor(depuis: Readonly<Partial<IDonneesFormulaireSimulateur>>) {
    Object.assign(this, depuis);
  }

  avec(
    modifie: Partial<IDonneesFormulaireSimulateur>,
  ): IDonneesFormulaireSimulateur {
    return { ...this, ...modifie };
  }
}

export const donneesFormulaireSimulateurVide: IDonneesBrutesFormulaireSimulateur =
  {
    designeOperateurServicesEssentiels: [],
    etatMembre: [],
    secteurActivite: [],
    sousSecteurActivite: [],
    trancheCA: [],
    trancheNombreEmployes: [],
    typeStructure: [],
    activites: [],
  };
