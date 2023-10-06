import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../DonneesFormulaire.ts";
import { TValeursSecteursAvecSousSecteurs } from "../SousSecteurs.ts";
import {
  TValeursSousSecteursActivites,
  ValeursSousSecteurEnergie,
  ValeursSousSecteurFabrication,
  ValeursSousSecteurTransport,
} from "../ValeursCles.ts";

export type Validateur = (donnees: DonneesFormulaireSimulateur) => boolean;

export type ValidationReponses = {
  message: string;
  validateur: Validateur;
};

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

const groupementsChamps: Pick<
  Record<
    NomsChampsSimulateur,
    Pick<
      Record<
        NomsChampsSimulateur,
        | Record<
            TValeursSecteursAvecSousSecteurs,
            readonly TValeursSousSecteursActivites[]
          >
        | Record<string, readonly string[]>
      >,
      "sousSecteurActivite" | "secteurActivite"
    >
  >,
  "sousSecteurActivite" | "activites"
> = {
  activites: {
    secteurActivite: {
      energie: ValeursSousSecteurEnergie,
      transports: ValeursSousSecteurTransport,
      fabrication: ValeursSousSecteurFabrication,
    },
    sousSecteurActivite: {},
  },
  sousSecteurActivite: {
    secteurActivite: {
      energie: ValeursSousSecteurEnergie,
      transports: ValeursSousSecteurTransport,
      fabrication: ValeursSousSecteurFabrication,
    },
    sousSecteurActivite: {},
  },
};
const fabriqueListeChampsPourValeur = (
  nomChamp: NomsChampsSimulateur,
  nomChampGroupement: NomsChampsSimulateur,
  valeurGroupement: TValeursSecteursAvecSousSecteurs,
) =>
  groupementsChamps[nomChamp as "sousSecteurActivite" | "activites"][
    nomChampGroupement as "sousSecteurActivite" | "secteurActivite"
  ][valeurGroupement] as string[];

const unAppartientA = (
  nomChamp: "sousSecteurActivite" | "activites",
  nomChampGroupement: "sousSecteurActivite" | "secteurActivite",
  valeurGroupement: TValeursSecteursAvecSousSecteurs,
) => {
  return (donneesFormulaireSimulateur: DonneesFormulaireSimulateur) =>
    donneesFormulaireSimulateur[nomChamp].some(
      (valeur) =>
        fabriqueListeChampsPourValeur(
          nomChamp,
          nomChampGroupement,
          valeurGroupement,
        )?.includes(valeur as string),
    );
};

export const auMoinsUnPar: (
  nomChamp: "sousSecteurActivite" | "activites",
  nomChampGroupement: "sousSecteurActivite" | "secteurActivite",
) => Validateur = (
  nomChamp: "sousSecteurActivite" | "activites",
  nomChampGroupement: "sousSecteurActivite" | "secteurActivite",
) => {
  return (donneesFormulaireSimulateur) => {
    const validateursParGroupe = donneesFormulaireSimulateur[
      nomChampGroupement
    ].map((valeur) =>
      unAppartientA(
        nomChamp,
        nomChampGroupement,
        valeur as TValeursSecteursAvecSousSecteurs,
      ),
    );
    const validateur = et(
      ...validateursParGroupe,
      auMoinsN(
        donneesFormulaireSimulateur[nomChampGroupement].length,
        nomChamp,
      ),
    );
    return validateur(donneesFormulaireSimulateur);
  };
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
  validateur: auMoinsUnPar("sousSecteurActivite", "secteurActivite"),
};
export const validationReponsesActivites = {
  message: "Sélectionnez au moins une réponse par secteur",
  validateur: auMoinsUn("activites"),
};
