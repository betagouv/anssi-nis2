import { SecteurActivite } from "./SecteurActivite.definitions.ts";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions.ts";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
  ValeurChampSimulateur,
} from "./ChampsSimulateur.definitions.ts";
import { ValeursActivites } from "./Activite.definitions.ts";
import { ValeursNomChampsFormulaire } from "./DonneesFormulaire.valeurs";

export type NomsChampsSimulateur = (typeof ValeursNomChampsFormulaire)[number];

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
  typeEntitePublique: TypeEntitePublique[];
}

export interface IDonneesFormulaireSimulateur
  extends IDonneesBrutesFormulaireSimulateur {
  avec(
    modifie: Partial<IDonneesFormulaireSimulateur>
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
  typeEntitePublique: TypeEntitePublique[] = [];

  constructor(depuis: Readonly<Partial<IDonneesFormulaireSimulateur>>) {
    Object.assign(this, depuis);
  }

  avec(
    modifie: Partial<IDonneesFormulaireSimulateur>
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
    typeEntitePublique: [],
    activites: [],
  };
