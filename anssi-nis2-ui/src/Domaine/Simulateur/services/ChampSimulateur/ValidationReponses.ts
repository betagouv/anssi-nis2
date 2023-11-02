import { ValidationReponses } from "./champs.domaine.ts";
import {
  auMoinsUn,
  auMoinsUneActiviteParValeurSectorielle,
  auMoinsUnSousSecteurParSecteur,
  et,
} from "./champs.predicats.ts";
import { NomsChampsSimulateur } from "../../DonneesFormulaire.ts";

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
  validateur: auMoinsUneActiviteParValeurSectorielle,
};
export const validationToutesLesReponses: ValidationReponses = {
  message: "",
  validateur: () => true,
};
export const fabriqueValidationUneReponses = (
  nomChamp: NomsChampsSimulateur,
): ValidationReponses => ({
  message: "Selectionnez une réponse",
  validateur: auMoinsUn(nomChamp),
});
