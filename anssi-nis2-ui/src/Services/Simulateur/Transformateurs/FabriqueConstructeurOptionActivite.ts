import {
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import {
  AttributsEntreeChoixMultiple,
  OptionChampSimulateur,
} from "../Props/optionChampSimulateur";
import { libellesActivites } from "../../../References/LibellesActivites.ts";
import { listeDescriptionsActivites } from "../../../References/ListeDescriptionsActivites.ts";
import { SimulateurDonneesFormulaireActions } from "../Props/donneesFormulaire";
import { ValeurChampSimulateur } from "../../../../../anssi-nis2-domain/src/Simulateur/ChampsSimulateur.definitions.ts";
import {
  activitesParSecteurEtSousSecteur,
  AssociationSectorielleActivite,
} from "../../../../../anssi-nis2-domain/src/Simulateur/services/Activite/Activite.operations.ts";
import React, { Dispatch } from "react";
import { ValeursActivites } from "../../../../../anssi-nis2-domain/src/Simulateur/Activite.definitions.ts";
import { ValeurCleSectorielle } from "../../../../../anssi-nis2-domain/src/Simulateur/ValeurCleSectorielle.definitions.ts";

export const fabriqueConstructeurOptionActivite: (
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
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

function fabriqueOptions(
  secteurOuSousSecteur: ValeurCleSectorielle,
  construitOptionActivite: (
    activite: ValeursActivites,
  ) => OptionChampSimulateur,
) {
  const activitesParSecteurEtSousSecteurElement =
    activitesParSecteurEtSousSecteur[secteurOuSousSecteur];
  if (!activitesParSecteurEtSousSecteurElement) {
    throw EvalError(`Aucune activité trouvée pour ${secteurOuSousSecteur}`);
  }
  return (
    activitesParSecteurEtSousSecteurElement?.map(construitOptionActivite) || []
  );
}

export const fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur: (
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
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
