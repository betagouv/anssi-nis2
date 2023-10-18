import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { Activite } from "../../../Domaine/Simulateur/Activite.ts";
import {
  AttributsEntreeChoixMultiple,
  OptionChampSimulateur,
} from "../Props/optionChampSimulateur";
import { libellesActivites } from "../../../References/LibellesActivites.ts";
import { listeDescriptionsActivites } from "../../../References/ListeDescriptionsActivites.ts";
import { SimulateurDonneesFormulaireActions } from "../Props/donneesFormulaire";
import {
  ValeurChampSimulateur,
  ValeurCleSectorielle,
} from "../../../Domaine/Simulateur/ChampsSimulateur";
import {
  activitesParSecteurEtSousSecteur,
  AssociationSectorielleActivite,
} from "../../../Domaine/Simulateur/ActivitesParSecteurEtSousSecteur.ts";
import { Dispatch } from "react";

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
