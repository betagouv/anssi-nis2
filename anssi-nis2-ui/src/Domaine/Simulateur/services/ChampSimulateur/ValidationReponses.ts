import { ValidationReponses } from "./champs.domaine.ts";
import {
  auMoinsUn,
  auMoinsUneActiviteParValeurSectorielleListee,
  auMoinsUnSousSecteurParSecteur,
  et,
  exactementUn,
  lorsque,
} from "./champs.predicats.ts";
import { NomsChampsSimulateur } from "../../DonneesFormulaire.ts";

export const fabriqueValidationUneReponses = (
  nomChamp: NomsChampsSimulateur,
): ValidationReponses => ({
  message: "Selectionnez une réponse",
  validateur: exactementUn(nomChamp),
});
export const validationReponsesTaille: ValidationReponses = {
  message: "Sélectionnez une réponse pour chaque critère",
  validateur: et(auMoinsUn("trancheNombreEmployes"), auMoinsUn("trancheCA")),
};
export const validationReponsesSecteurs: ValidationReponses = {
  message: "Sélectionnez au moins une réponse",
  validateur: auMoinsUn("secteurActivite"),
};
export const validationReponsesSousActivites: ValidationReponses = {
  message: "Sélectionnez au moins une réponse par secteur",
  validateur: auMoinsUnSousSecteurParSecteur,
};
export const validationReponsesActivites: ValidationReponses = {
  message: "Sélectionnez au moins une réponse par secteur",
  validateur: auMoinsUneActiviteParValeurSectorielleListee,
};
export const validationToutesLesReponses: ValidationReponses = {
  message: "",
  validateur: () => true,
};

export const validationReponsesTypeStructure: ValidationReponses = {
  message: "Sélectionnez une réponse par question",
  validateur: et(
    auMoinsUn("typeStructure"),
    lorsque("typeStructure", "publique", auMoinsUn("typeEntitePublique")),
  ),
};

export const validationReponsesLocalisationActiviteSpecifique: ValidationReponses =
  {
    message: "Sélectionnez une réponse par question",
    validateur: et(
      auMoinsUn("fournitServicesUnionEuropeenne"),
      lorsque(
        "fournitServicesUnionEuropeenne",
        "oui",
        auMoinsUn("localisationRepresentant"),
      ),
    ),
  };
