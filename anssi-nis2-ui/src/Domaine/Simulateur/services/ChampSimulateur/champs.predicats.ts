import {
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../DonneesFormulaire.ts";
import { SecteursAvecSousSecteurs } from "../../SousSecteurActivite.definition.ts";
import { PredicatChamp } from "./champs.domaine.ts";
import { SecteurActivite } from "../../SecteurActivite.definition.ts";
import {
  estSousSecteurAutre,
  sousSecteurAppartientASecteur,
} from "../SousSecteurActivite/SousSecteurActivite.predicats.ts";
import { ValeurCleSectorielle } from "../../ChampsSimulateur.definitions.ts";
import { ValeursActivites } from "../../Activite";
import { activiteEstDansSecteur } from "../Activite/Activite.predicats.ts";
import { filtreSecteursSansSousSecteurs } from "../SecteurActivite/SecteurActivite.operations.ts";

export const et: (...validateurs: Array<PredicatChamp>) => PredicatChamp = (
  ...validateurs
) => {
  return (donneesFormulaireSimulateur) => {
    return validateurs.every((validateur) =>
      validateur(donneesFormulaireSimulateur),
    );
  };
};
export const ou: (...validateurs: Array<PredicatChamp>) => PredicatChamp = (
  ...validateurs
) => {
  return (donneesFormulaireSimulateur) => {
    return validateurs.some((validateur) =>
      validateur(donneesFormulaireSimulateur),
    );
  };
};

export const auMoinsN =
  (n: number, nomChamp: NomsChampsSimulateur) =>
  (donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur) =>
    donneesFormulaireSimulateur[nomChamp].filter(
      (listeValeurs) => listeValeurs.length > 0,
    ).length >
    n - 1;

export const auMoinsUn = (nomChamp: NomsChampsSimulateur) =>
  auMoinsN(1, nomChamp);

export const auMoinsUnSousSecteurParSecteur: PredicatChamp = (
  donneesFormulaireSimulateur,
) => {
  const valeursSecteur: SecteurActivite[] =
    donneesFormulaireSimulateur.secteurActivite as SecteurActivite[];
  const validateursParGroupe = valeursSecteur.map((valeur) =>
    sousSecteurAppartientASecteur(valeur as SecteursAvecSousSecteurs),
  );
  const validateur = et(
    ...validateursParGroupe,
    auMoinsN(
      donneesFormulaireSimulateur.secteurActivite.length,
      "sousSecteurActivite",
    ),
  );
  return validateur(donneesFormulaireSimulateur);
};

const auMoinsUneActiviteEstDansSecteur = (
  activites: ValeursActivites[],
  secteurActivite: ValeurCleSectorielle,
) => {
  return activites.some((activite) =>
    activiteEstDansSecteur(activite, secteurActivite),
  );
};

export const auMoinsUneActiviteParValeurSectorielle: PredicatChamp = (
  donneesFormulaireSimulateur,
) => {
  const secteursEtSousSecteurs: ValeurCleSectorielle[] = [
    ...filtreSecteursSansSousSecteurs(
      donneesFormulaireSimulateur.secteurActivite,
    ),
    ...donneesFormulaireSimulateur.sousSecteurActivite,
  ];
  return secteursEtSousSecteurs.every((secteurActivite) =>
    auMoinsUneActiviteEstDansSecteur(
      donneesFormulaireSimulateur.activites,
      secteurActivite,
    ),
  );
};

export const contientSousSecteurAutresUniquement = (
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) =>
  donneesFormulaire.sousSecteurActivite.length > 0 &&
  donneesFormulaire.sousSecteurActivite.every(estSousSecteurAutre);
