import { Activite } from "./Activite.ts";
import { SecteurActivite } from "./SecteursActivite";
import { SousSecteurActivite } from "./SousSecteurs";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
  ValeurChampSimulateur,
} from "./ChampsSimulateur";

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
  activites: Activite[] = [];
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
export type DonneesSimulateurTailleEntreprise = Pick<
  DonneesFormulaireSimulateur,
  "trancheCA" | "trancheNombreEmployes"
>;
export const archetypeReponsesPetiteEntreprise: DonneesSimulateurTailleEntreprise =
  {
    trancheCA: ["petit"],
    trancheNombreEmployes: ["petit"],
  };
export const archetypeReponsesMoyenneEntreprise: DonneesSimulateurTailleEntreprise =
  {
    trancheCA: ["moyen"],
    trancheNombreEmployes: ["moyen"],
  };
export const archetypeReponsesGrandeEntreprise: DonneesSimulateurTailleEntreprise =
  {
    trancheCA: ["grand"],
    trancheNombreEmployes: ["grand"],
  };
export const combinatoireEntrepriseMoyenne: DonneesSimulateurTailleEntreprise[] =
  [
    archetypeReponsesMoyenneEntreprise,
    {
      ...archetypeReponsesMoyenneEntreprise,
      trancheCA: ["petit"],
    },
    {
      ...archetypeReponsesMoyenneEntreprise,
      trancheNombreEmployes: ["petit"],
    },
  ];
export const combinatoireGrandesEntreprises: DonneesSimulateurTailleEntreprise[] =
  [
    archetypeReponsesGrandeEntreprise,
    {
      ...archetypeReponsesGrandeEntreprise,
      trancheCA: ["moyen"],
    },
    {
      ...archetypeReponsesGrandeEntreprise,
      trancheCA: ["petit"],
    },
    {
      ...archetypeReponsesGrandeEntreprise,
      trancheNombreEmployes: ["moyen"],
    },
    {
      ...archetypeReponsesGrandeEntreprise,
      trancheNombreEmployes: ["petit"],
    },
  ];
