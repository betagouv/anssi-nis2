import { Activite } from "../../../../commun/core/src/Domain/Simulateur/Activite.definitions.ts";
import { ValeurChampSimulateur } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import {
  DonneesSectorielles,
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { SecteurSimple } from "../../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { SousSecteurActivite } from "../../../../commun/core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import {
  AttributsEntreeChoixMultiple,
  OptionChampSimulateur,
} from "../Simulateur/Props/optionChampSimulateur";
import { libellesActivites } from "../../References/LibellesActivites.ts";
import { listeDescriptionsActivites } from "../../References/ListeDescriptionsActivites.ts";
import { SimulateurDonneesFormulaireActions } from "../Simulateur/Props/donneesFormulaire";
import {
  activitesParSecteurEtSousSecteur,
  AssociationSectorielleActivite,
} from "../../../../commun/core/src/Domain/Simulateur/Activite.operations.ts";
import React, { Dispatch } from "react";

export const constructeurOptionActiviteFabrique: (
  donneesFormulaire: Pick<DonneesFormulaireSimulateur, "activites"> &
    DonneesSectorielles,
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

const fabriqueChangeMulti: (
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>,
) => React.ChangeEventHandler<HTMLInputElement> =
  (propageActionSimulateur) => (evt) => {
    return propageActionSimulateur({
      type: "checkMulti",
      name: evt.target.name as NomsChampsSimulateur,
      newValue: evt.target.value as ValeurChampSimulateur,
    });
  };

const fabriqueOptions = (
  secteurOuSousSecteur: SecteurSimple | SousSecteurActivite,
  construitOptionActivite: (activite: Activite) => OptionChampSimulateur,
) => {
  const activitesParSecteurEtSousSecteurElement =
    activitesParSecteurEtSousSecteur[secteurOuSousSecteur];
  if (!activitesParSecteurEtSousSecteurElement) {
    throw EvalError(`Aucune activité trouvée pour ${secteurOuSousSecteur}`);
  }
  return (
    activitesParSecteurEtSousSecteurElement?.map(construitOptionActivite) || []
  );
};

export const fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur: (
  donneesFormulaire: Pick<DonneesFormulaireSimulateur, "activites"> &
    DonneesSectorielles,
  propageActionSimulateur: Dispatch<SimulateurDonneesFormulaireActions>,
) => (
  tupleSecteurEtActivite: AssociationSectorielleActivite,
) => AttributsEntreeChoixMultiple = (
  donneesFormulaire,
  propageActionSimulateur,
) => {
  const construitOptionActivite = constructeurOptionActiviteFabrique(
    donneesFormulaire,
    fabriqueChangeMulti(propageActionSimulateur),
  );
  return ({
    secteurOuSousSecteur,
    titreActivite,
  }: AssociationSectorielleActivite) => ({
    legende: titreActivite,
    options: fabriqueOptions(secteurOuSousSecteur, construitOptionActivite),
  });
};
