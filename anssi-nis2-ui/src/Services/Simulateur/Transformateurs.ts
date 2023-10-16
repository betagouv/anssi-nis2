import { genereTransformateurValeursVersOptions } from "./genereTransformateurValeursVersOptions.ts";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";

import { libellesActivites } from "../../References/LibellesActivites.ts";
import { listeDescriptionsActivites } from "../../References/ListeDescriptionsActivites.ts";
import { SimulateurDonneesFormulaireActions } from "./Props/donneesFormulaire";
import { reducteurSecteursVersOptions } from "./Reducteurs.ts";
import {
  activitesParSecteurEtSousSecteur,
  AssociationSectorielleActivite,
} from "../../Domaine/Simulateur/ActivitesParSecteurEtSousSecteur.ts";
import { Dispatch } from "react";

import { SimulateurContenuEtapeProps } from "./Props/simulateurEtapeProps";
import {
  AttributsEntreeChoixMultiple,
  OptionChampSimulateur,
  OptionsChampSimulateur,
} from "./Props/optionChampSimulateur";
import { TransformeRecordToSelect } from "./Operations/optionChampSimulateur";
import { GenerateurLibelle } from "./Operations/operationsLibelles";
import { SecteurActivite } from "../../Domaine/Simulateur/SecteursActivite";
import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../Domaine/Simulateur/SousSecteurs";
import { Activite } from "../../Domaine/Simulateur/Activite.ts";
import { sousSecteursParSecteur } from "../../Domaine/Simulateur/ValeursSousSecteursActivites.ts";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
  ValeurChampSimulateur,
  ValeurCleSectorielle,
} from "../../Domaine/Simulateur/ChampsSimulateur";

const recupereLibelleReponseOSE = (
  value: string,
  reponsesDesigneOse: Partial<
    Record<DesignationOperateurServicesEssentiels, string>
  >,
) =>
  reponsesDesigneOse[value as DesignationOperateurServicesEssentiels] || value;
export const transformeReponsesDesigneOSEPourSelect: TransformeRecordToSelect<DesignationOperateurServicesEssentiels> =
  genereTransformateurValeursVersOptions(
    recupereLibelleReponseOSE,
    "designeOperateurServicesEssentiels",
  );

const getPaysUnionEuropeenneElement = (
  value: string,
  paysUnionEuropeenne: Partial<Record<AppartenancePaysUnionEuropeenne, string>>,
) => paysUnionEuropeenne[value as AppartenancePaysUnionEuropeenne] || value;
export const transformePaysUnionEuropeennePourSelect: TransformeRecordToSelect<AppartenancePaysUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    getPaysUnionEuropeenneElement,
    "etatMembre",
  );
const getTypesStructureElement = (
  value: string,
  typesStructure: Partial<Record<TypeStructure, string>>,
) => typesStructure[value as TypeStructure] || value;
export const transformeTypeStructureVersOptions: TransformeRecordToSelect<TypeStructure> =
  genereTransformateurValeursVersOptions(
    getTypesStructureElement,
    "typeStructure",
  );
const getNombreEmployesElement = (
  value: string,
  tranchesNombreEmployes: Partial<Record<TrancheNombreEmployes, string>>,
) => tranchesNombreEmployes[value as TrancheNombreEmployes] || value;
export const transformeTranchesNombreEmployesVersOptions: TransformeRecordToSelect<TrancheNombreEmployes> =
  genereTransformateurValeursVersOptions(
    getNombreEmployesElement,
    "trancheNombreEmployes",
  );
const getCALabel = (
  value: string,
  tranchesCA: Partial<Record<TrancheChiffreAffaire, string>>,
) => tranchesCA[value as TrancheChiffreAffaire] || value;
export const transformeTranchesCAVersOptions: TransformeRecordToSelect<TrancheChiffreAffaire> =
  genereTransformateurValeursVersOptions(getCALabel, "trancheCA");
export const getSecteurActiviteLabel = (
  value: string,
  secteurActivite: Partial<Record<SecteurActivite, string>>,
) => secteurActivite[value as SecteurActivite] || value;
export const transformeSecteursActiviteVersOptions: TransformeRecordToSelect<SecteurActivite> =
  genereTransformateurValeursVersOptions(
    getSecteurActiviteLabel,
    "secteurActivite",
  );

const getSousSecteurLabel: GenerateurLibelle<SousSecteurActivite> = (
  value: string,
  sousSecteur: Partial<Record<SousSecteurActivite, string>>,
) => sousSecteur[value as SousSecteurActivite] || value;

export const transformateurSousSecteurActivite: TransformeRecordToSelect<SousSecteurActivite> =
  genereTransformateurValeursVersOptions(
    getSousSecteurLabel,
    "sousSecteurActivite",
  );

export const collecteTitresPourActivite = (
  libellesSecteursActivite: Record<SecteurActivite, string>,
  libellesSousSecteursActivite: Record<SousSecteurActivite, string>,
  donneesFormulaire: DonneesFormulaireSimulateur,
): AssociationSectorielleActivite[] => {
  const cartographieSecteurs =
    cartographieSousSecteursParSecteur(donneesFormulaire);

  const collecteTitreSousSecteurs: (
    libelleSecteursActivite: string,
    listeSousSecteurs: SousSecteurActivite[],
  ) => AssociationSectorielleActivite[] = (
    libelleSecteursActivite: string,
    listeSousSecteurs: SousSecteurActivite[],
  ) =>
    listeSousSecteurs.map((sousSecteur: SousSecteurActivite) => ({
      secteurOuSousSecteur: sousSecteur,
      titreActivite: `${libelleSecteursActivite} / ${libellesSousSecteursActivite[sousSecteur]}`,
    }));

  return Object.entries(cartographieSecteurs).reduce(
    (acc: AssociationSectorielleActivite[], [secteur, listeSousSecteurs]) => {
      const libelleSecteursActivite: string =
        libellesSecteursActivite[secteur as SecteurActivite];
      return [
        ...acc,
        ...(listeSousSecteurs.length === 0
          ? [
              {
                secteurOuSousSecteur: secteur,
                titreActivite: libelleSecteursActivite,
              },
            ]
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
): Partial<Record<SecteurActivite, SousSecteurActivite[]>> => {
  const { secteurActivite, sousSecteurActivite } = donneesFormulaire;

  const secteursStructures = secteurActivite
    .filter((secteur) => !Object.keys(sousSecteursParSecteur).includes(secteur))
    .reduce((acc, currentValue) => ({ ...acc, [currentValue]: [] }), {});

  const sousSecteursStructures: Partial<
    Record<SecteurActivite, SousSecteurActivite[]>
  > = secteurActivite
    .filter((secteur) => Object.keys(sousSecteursParSecteur).includes(secteur))
    .reduce((acc, currentValue) => {
      return {
        ...acc,
        [currentValue]: sousSecteurActivite.filter((sousSecteur) =>
          sousSecteursParSecteur[
            currentValue as SecteursAvecSousSecteurs
          ].includes(sousSecteur as SousSecteurActivite),
        ),
      };
    }, {});

  return { ...secteursStructures, ...sousSecteursStructures };
};

export const fabriqueConstructeurOptionActivite: (
  donneesFormulaire: DonneesFormulaireSimulateur,
  changeMulti: React.ChangeEventHandler<HTMLInputElement>,
) => (activite: Activite) => OptionChampSimulateur =
  (donneesFormulaire, changeMulti) => (activite) => ({
    label: libellesActivites[activite],
    contenuInfobulle: listeDescriptionsActivites[activite],
    nativeInputProps: {
      value: activite,
      checked: donneesFormulaire.activites.includes(activite),
      onChange: changeMulti,
      name: "activites",
    },
  });
export const transformeSousSecteurEnOptions = (
  donneesFormulaire: SimulateurContenuEtapeProps["donneesFormulaire"],
  gereChangement: (event: React.ChangeEvent<HTMLInputElement>) => void,
): [SecteursAvecSousSecteurs, OptionsChampSimulateur][] => {
  return (
    donneesFormulaire.secteurActivite as SecteursAvecSousSecteurs[]
  ).reduce(reducteurSecteursVersOptions(gereChangement, donneesFormulaire), []);
};
const fabriqueChangeMulti: (
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>,
) => React.ChangeEventHandler<HTMLInputElement> =
  (propageActionSimulateur) => (evt) =>
    propageActionSimulateur({
      type: "checkMulti",
      name: evt.target.name as NomsChampsSimulateur,
      newValue: evt.target.value as ValeurChampSimulateur,
    });
export const fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur: (
  donneesFormulaire: DonneesFormulaireSimulateur,
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>,
) => (
  tupleSecteurEtActivite: AssociationSectorielleActivite,
) => AttributsEntreeChoixMultiple = (
  donneesFormulaire,
  propageActionSimulateur,
) => {
  const construitOptionActivite = fabriqueConstructeurOptionActivite(
    donneesFormulaire,
    fabriqueChangeMulti(propageActionSimulateur),
  );
  return ({ secteurOuSousSecteur, titreActivite }) => ({
    legende: titreActivite,
    options: activitesParSecteurEtSousSecteur[
      secteurOuSousSecteur as ValeurCleSectorielle
    ].map(construitOptionActivite),
  });
};
