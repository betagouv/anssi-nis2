import {
  genereTransformateurValeursVersOptions,
  TransformeRecordToSelect,
} from "./simulateurFrontServices.ts";
import {
  TValeursSecteursActivites,
  TValeursSousSecteursActivites,
  ValeursClePaysUnionEuropeenne,
  ValeursTrancheCA,
  ValeursTrancheNombreEmployes,
  ValeursTypeStructure,
} from "../../Domaine/Simulateur/ValeursCles.ts";
import { DonneesFormulaireSimulateur } from "./donneesFormulaire.ts";
import { sousSecteursParSecteur } from "../../Domaine/Simulateur/SecteursActivite.ts";

const getPaysUnionEuropeenneElement = (
  value: string,
  paysUnionEuropeenne: Record<ValeursClePaysUnionEuropeenne, string>,
) => paysUnionEuropeenne[value as ValeursClePaysUnionEuropeenne];
export const transformePaysUnionEuropeennePourSelect: TransformeRecordToSelect<ValeursClePaysUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    getPaysUnionEuropeenneElement,
    "etatMembre",
  );
const getTypesStructureElement = (
  value: string,
  typesStructure: Record<ValeursTypeStructure, string>,
) => typesStructure[value as ValeursTypeStructure];
export const transformeTypeStructureVersOptions: TransformeRecordToSelect<ValeursTypeStructure> =
  genereTransformateurValeursVersOptions(
    getTypesStructureElement,
    "typeStructure",
  );
const getNombreEmployesElement = (
  value: string,
  tranchesNombreEmployes: Record<ValeursTrancheNombreEmployes, string>,
) => tranchesNombreEmployes[value as ValeursTrancheNombreEmployes];
export const transformeTranchesNombreEmployesVersOptions: TransformeRecordToSelect<ValeursTrancheNombreEmployes> =
  genereTransformateurValeursVersOptions(
    getNombreEmployesElement,
    "trancheNombreEmployes",
  );
const getCALabel = (
  value: string,
  tranchesCA: Record<ValeursTrancheCA, string>,
) => tranchesCA[value as ValeursTrancheCA];
export const transformeTranchesCAVersOptions: TransformeRecordToSelect<ValeursTrancheCA> =
  genereTransformateurValeursVersOptions(getCALabel, "trancheCA");
export const getSecteurActiviteLabel = (
  value: string,
  secteurActivite: Record<TValeursSecteursActivites, string>,
) => secteurActivite[value as TValeursSecteursActivites];
export const transformeSecteursActiviteVersOptions: TransformeRecordToSelect<TValeursSecteursActivites> =
  genereTransformateurValeursVersOptions(
    getSecteurActiviteLabel,
    "secteurActivite",
  );
export const collecteTitresPourActivite = (
  libellesSecteursActivite: Record<TValeursSecteursActivites, string>,
  libellesSousSecteursActivite: Record<TValeursSousSecteursActivites, string>,
  donneesFormulaire: DonneesFormulaireSimulateur,
): string[] => {
  const cartographieSecteurs =
    cartographieSousSecteursParSecteur(donneesFormulaire);

  const collecteTitreSousSecteurs = (
    libelleSecteursActivite: string,
    listeSousSecteurs: TValeursSousSecteursActivites[],
  ) =>
    listeSousSecteurs.map(
      (sousSecteur: TValeursSousSecteursActivites) =>
        `${libelleSecteursActivite} / ${libellesSousSecteursActivite[sousSecteur]}`,
    );

  return Object.entries(cartographieSecteurs).reduce(
    (acc: string[], [secteur, listeSousSecteurs]) => {
      const libelleSecteursActivite: string =
        libellesSecteursActivite[secteur as TValeursSecteursActivites];
      return [
        ...acc,
        ...(listeSousSecteurs.length === 0
          ? [libelleSecteursActivite]
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
            currentValue as "energie" | "transports" | "fabrication"
          ].includes(sousSecteur),
        ),
      };
    }, {});

  return { ...secteursStructures, ...sousSecteursStructures };
};
