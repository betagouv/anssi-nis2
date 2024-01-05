import { ValeursActivites } from "../../../../../commun/core/src/Domain/Simulateur/Activite.definitions.ts";
import { ValeurChampSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import {
  DonneesSectorielles,
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.ts";
import { ValeurCleSectorielle } from "../../../../../commun/core/src/Domain/Simulateur/ValeurCleSectorielle.definitions.ts";
import {
  AttributsEntreeChoixMultiple,
  OptionChampSimulateur,
} from "../Props/optionChampSimulateur";
import { libellesActivites } from "../../../References/LibellesActivites.ts";
import { listeDescriptionsActivites } from "../../../References/ListeDescriptionsActivites.ts";
import { SimulateurDonneesFormulaireActions } from "../Props/donneesFormulaire";
import {
  activitesParSecteurEtSousSecteur,
  AssociationSectorielleActivite,
} from "../../../../../commun/core/src/Domain/Simulateur/services/Activite/Activite.operations.ts";
import React, { Dispatch } from "react";

export const fabriqueConstructeurOptionActivite: (
  donneesFormulaire: Pick<IDonneesBrutesFormulaireSimulateur, "activites"> &
    DonneesSectorielles,
  changeMulti: React.ChangeEventHandler<HTMLInputElement>,
) => (activite: ValeursActivites) => OptionChampSimulateur =
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
  secteurOuSousSecteur: ValeurCleSectorielle,
  construitOptionActivite: (
    activite: ValeursActivites,
  ) => OptionChampSimulateur,
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
  donneesFormulaire: Pick<IDonneesBrutesFormulaireSimulateur, "activites"> &
    DonneesSectorielles,
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
  return ({
    secteurOuSousSecteur,
    titreActivite,
  }: AssociationSectorielleActivite) => ({
    legende: titreActivite,
    options: fabriqueOptions(secteurOuSousSecteur, construitOptionActivite),
  });
};
