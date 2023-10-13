import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../DonneesFormulaire.ts";
import { SecteursAvecSousSecteurs } from "../SousSecteurs";
import {
  Validateur,
  ValidationReponses,
} from "../Operations/validateursChamps";
import { SecteurActivite } from "../SecteursActivite";
import { Activite } from "../Activite.ts";
import {
  activiteEstDansSecteur,
  filtreSecteursSansSousSecteurs,
} from "../Operations/operationsActivite.ts";
import { sousSecteurAppartientASecteur } from "../Operations/operationsSecteurs.ts";
import { ValeurCleSectorielle } from "../ValeursChampsSimulateur";

export const et: (...validateurs: Array<Validateur>) => Validateur = (
  ...validateurs
) => {
  return (donneesFormulaireSimulateur) => {
    return validateurs.every((validateur) =>
      validateur(donneesFormulaireSimulateur),
    );
  };
};

export const auMoinsN =
  (n: number, nomChamp: NomsChampsSimulateur) =>
  (donneesFormulaireSimulateur: DonneesFormulaireSimulateur) =>
    donneesFormulaireSimulateur[nomChamp].filter(
      (listeValeurs) => listeValeurs.length > 0,
    ).length >
    n - 1;

export const auMoinsUn = (nomChamp: NomsChampsSimulateur) =>
  auMoinsN(1, nomChamp);

export const auMoinsUnSousSecteurParSecteur: Validateur = (
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
  activites: Activite[],
  secteurActivite: ValeurCleSectorielle,
) => {
  return activites.some((activite) =>
    activiteEstDansSecteur(activite, secteurActivite),
  );
};

export const auMoinsUneActiviteParValeurSectorielle: Validateur = (
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

export const validationUneReponses = (
  nomChamp: NomsChampsSimulateur,
): ValidationReponses => ({
  message: "Selectionnez une réponse",
  validateur: auMoinsUn(nomChamp),
});

export const validationReponsesTaille = {
  message: "Sélectionnez une réponse pour chaque critère",
  validateur: et(auMoinsUn("trancheNombreEmployes"), auMoinsUn("trancheCA")),
};
export const validationReponsesSecteurs = {
  message: "Sélectionnez au moins une réponse",
  validateur: auMoinsUn("secteurActivite"),
};
export const validationReponsesSousActivites = {
  message: "Sélectionnez au moins une réponse par secteur",
  validateur: auMoinsUnSousSecteurParSecteur,
};
export const validationReponsesActivites = {
  message: "Sélectionnez au moins une réponse par secteur",
  validateur: auMoinsUneActiviteParValeurSectorielle,
};
