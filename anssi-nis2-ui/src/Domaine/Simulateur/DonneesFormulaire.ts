import { SecteurActivite } from "./SecteurActivite.definitions";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  FournitServicesUnionEuropeenne,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
  ValeurChampSimulateur,
} from "./ChampsSimulateur.definitions";
import { ValeursActivites } from "./Activite.definitions";
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
  fournitServicesUnionEuropeenne: FournitServicesUnionEuropeenne[];
  localisationRepresentant: AppartenancePaysUnionEuropeenne[];
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
  typeEntitePublique: TypeEntitePublique[] = [];
  fournitServicesUnionEuropeenne: FournitServicesUnionEuropeenne[] = [];
  localisationRepresentant: AppartenancePaysUnionEuropeenne[] = [];

  constructor(depuis: Readonly<Partial<IDonneesFormulaireSimulateur>>) {
    Object.assign(this, depuis);
  }

  avec(
    modifie: Partial<IDonneesFormulaireSimulateur>,
  ): IDonneesFormulaireSimulateur {
    return { ...this, ...modifie };
  }
}

export type DonneesSectorielles = Pick<
    IDonneesFormulaireSimulateur,
    "secteurActivite" | "sousSecteurActivite"
>;

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
    fournitServicesUnionEuropeenne: [],
    localisationRepresentant: [],
  };
