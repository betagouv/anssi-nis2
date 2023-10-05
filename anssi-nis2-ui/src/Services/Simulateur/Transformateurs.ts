import {
  GenerateurLibelle,
  genereTransformateurValeursVersOptions,
  TransformeRecordToSelect,
} from "./simulateurFrontServices.ts";
import {
  TValeursActivites,
  TValeursReponsesDesigneOSE,
  TValeursSecteursActivites,
  TValeursSousSecteursActivites,
  ValeursClePaysUnionEuropeenne,
  ValeursTrancheCA,
  ValeursTrancheNombreEmployes,
  ValeursTypeStructure,
} from "../../Domaine/Simulateur/ValeursCles.ts";
import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

import {
  sousSecteursParSecteur,
  TValeursSecteursAvecSousSecteurs,
} from "../../Domaine/Simulateur/SousSecteurs.ts";
import { libellesActivites } from "../../Domaine/References/LibellesActivites.ts";
import { listeDescriptionsActivites } from "../../Domaine/References/ListeDescriptionsActivites.ts";

const recupereLibelleReponseOSE = (
  value: string,
  reponsesDesigneOse: Partial<Record<TValeursReponsesDesigneOSE, string>>,
) => reponsesDesigneOse[value as TValeursReponsesDesigneOSE] || value;
export const transformeReponsesDesigneOSEPourSelect: TransformeRecordToSelect<TValeursReponsesDesigneOSE> =
  genereTransformateurValeursVersOptions(
    recupereLibelleReponseOSE,
    "designeOSE",
  );

const getPaysUnionEuropeenneElement = (
  value: string,
  paysUnionEuropeenne: Partial<Record<ValeursClePaysUnionEuropeenne, string>>,
) => paysUnionEuropeenne[value as ValeursClePaysUnionEuropeenne] || value;
export const transformePaysUnionEuropeennePourSelect: TransformeRecordToSelect<ValeursClePaysUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    getPaysUnionEuropeenneElement,
    "etatMembre",
  );
const getTypesStructureElement = (
  value: string,
  typesStructure: Partial<Record<ValeursTypeStructure, string>>,
) => typesStructure[value as ValeursTypeStructure] || value;
export const transformeTypeStructureVersOptions: TransformeRecordToSelect<ValeursTypeStructure> =
  genereTransformateurValeursVersOptions(
    getTypesStructureElement,
    "typeStructure",
  );
const getNombreEmployesElement = (
  value: string,
  tranchesNombreEmployes: Partial<Record<ValeursTrancheNombreEmployes, string>>,
) => tranchesNombreEmployes[value as ValeursTrancheNombreEmployes] || value;
export const transformeTranchesNombreEmployesVersOptions: TransformeRecordToSelect<ValeursTrancheNombreEmployes> =
  genereTransformateurValeursVersOptions(
    getNombreEmployesElement,
    "trancheNombreEmployes",
  );
const getCALabel = (
  value: string,
  tranchesCA: Partial<Record<ValeursTrancheCA, string>>,
) => tranchesCA[value as ValeursTrancheCA] || value;
export const transformeTranchesCAVersOptions: TransformeRecordToSelect<ValeursTrancheCA> =
  genereTransformateurValeursVersOptions(getCALabel, "trancheCA");
export const getSecteurActiviteLabel = (
  value: string,
  secteurActivite: Partial<Record<TValeursSecteursActivites, string>>,
) => secteurActivite[value as TValeursSecteursActivites] || value;
export const transformeSecteursActiviteVersOptions: TransformeRecordToSelect<TValeursSecteursActivites> =
  genereTransformateurValeursVersOptions(
    getSecteurActiviteLabel,
    "secteurActivite",
  );

const getSousSecteurLabel: GenerateurLibelle<TValeursSousSecteursActivites> = (
  value: string,
  sousSecteur: Partial<Record<TValeursSousSecteursActivites, string>>,
) => sousSecteur[value as TValeursSousSecteursActivites] || value;

export const transformateurSousSecteurActivite: TransformeRecordToSelect<TValeursSousSecteursActivites> =
  genereTransformateurValeursVersOptions(
    getSousSecteurLabel,
    "sousSecteurActivite",
  );

export const collecteTitresPourActivite = (
  libellesSecteursActivite: Record<TValeursSecteursActivites, string>,
  libellesSousSecteursActivite: Record<TValeursSousSecteursActivites, string>,
  donneesFormulaire: DonneesFormulaireSimulateur,
): string[][] => {
  const cartographieSecteurs =
    cartographieSousSecteursParSecteur(donneesFormulaire);

  const collecteTitreSousSecteurs = (
    libelleSecteursActivite: string,
    listeSousSecteurs: TValeursSousSecteursActivites[],
  ) =>
    listeSousSecteurs.map((sousSecteur: TValeursSousSecteursActivites) => [
      sousSecteur,
      `${libelleSecteursActivite} / ${libellesSousSecteursActivite[sousSecteur]}`,
    ]);

  return Object.entries(cartographieSecteurs).reduce(
    (acc: string[][], [secteur, listeSousSecteurs]) => {
      const libelleSecteursActivite: string =
        libellesSecteursActivite[secteur as TValeursSecteursActivites];
      return [
        ...acc,
        ...(listeSousSecteurs.length === 0
          ? [[secteur, libelleSecteursActivite]]
          : collecteTitreSousSecteurs(
              libelleSecteursActivite,
              listeSousSecteurs,
            )),
      ];
    },
    [],
  );
};
export const cartographieSousSecteursParSecteur = (
  donneesFormulaire: DonneesFormulaireSimulateur,
): Partial<
  Record<TValeursSecteursActivites, TValeursSousSecteursActivites[]>
> => {
  const { secteurActivite, sousSecteurActivite } = donneesFormulaire;

  const secteursStructures = secteurActivite
    .filter((secteur) => !Object.keys(sousSecteursParSecteur).includes(secteur))
    .reduce((acc, currentValue) => ({ ...acc, [currentValue]: [] }), {});

  const sousSecteursStructures: Partial<
    Record<TValeursSecteursActivites, TValeursSousSecteursActivites[]>
  > = secteurActivite
    .filter((secteur) => Object.keys(sousSecteursParSecteur).includes(secteur))
    .reduce((acc, currentValue) => {
      return {
        ...acc,
        [currentValue]: sousSecteurActivite.filter((sousSecteur) =>
          sousSecteursParSecteur[
            currentValue as TValeursSecteursAvecSousSecteurs
          ].includes(sousSecteur),
        ),
      };
    }, {});

  return { ...secteursStructures, ...sousSecteursStructures };
};

export const construitListeActivites =
  (
    donneesFormulaire: DonneesFormulaireSimulateur,
    changeMulti: React.ChangeEventHandler<HTMLInputElement>,
  ) =>
  (activite: TValeursActivites) => ({
    label: libellesActivites[activite],
    contenuInfobulle: listeDescriptionsActivites[activite],
    nativeInputProps: {
      value: activite,
      checked: donneesFormulaire.activites.includes(activite),
      onChange: changeMulti,
      name: "activites",
    },
  });
