import {
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../DonneesFormulaire.ts";
import { SecteursAvecSousSecteurs } from "../SousSecteurs";
import {
  Validateur,
  ValidationReponses,
} from "../operations/validateursChamps";
import { SecteurActivite } from "../SecteursActivite";
import { Activite } from "../Activite.ts";
import {
  activiteEstDansSecteur,
  filtreSecteursSansSousSecteurs,
} from "../operations/operationsActivite.ts";
import {
  estSousSecteurAutre,
  sousSecteurAppartientASecteur,
} from "../operations/operationsSecteurs.ts";
import { ValeurCleSectorielle } from "../ChampsSimulateur";

export const et: (...validateurs: Array<Validateur>) => Validateur = (
  ...validateurs
) => {
  return (donneesFormulaireSimulateur) => {
    return validateurs.every((validateur) =>
      validateur(donneesFormulaireSimulateur),
    );
  };
};
export const ou: (...validateurs: Array<Validateur>) => Validateur = (
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

export const contientAutreSecteurActiviteUniquement = (
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) =>
  donneesFormulaire.secteurActivite.length === 1 &&
  donneesFormulaire.secteurActivite[0] === "autreSecteurActivite";

export const contientSousSecteurAutresUniquement = (
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) =>
  donneesFormulaire.sousSecteurActivite.length > 0 &&
  donneesFormulaire.sousSecteurActivite.every(estSousSecteurAutre);

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
export const valideToutesLesReponses: ValidationReponses = {
  message: "",
  validateur: () => true,
};
