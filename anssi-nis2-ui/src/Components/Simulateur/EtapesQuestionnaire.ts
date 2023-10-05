import {
  EtapeActivite,
  EtapeLocalisation,
  EtapeOSE,
  EtapeSecteurActivite,
  EtapeSousSecteurActivite,
  EtapeTaille,
  EtapeTypeStructure,
} from ".";
import { CollectionInformationsEtapes } from "../../Services/Simulateur/CollectionInformationsEtapes.ts";
import {
  InformationEtapeForm,
  InformationEtapeResult,
  SousEtapeConditionnelle,
  ValidationReponses,
} from "../../Services/Simulateur/informationsEtape.ts";
import { EtatEtapes } from "../../Services/Simulateur/EtatEtapes.ts";
import { valideAuMoinsUn } from "../../Domaine/Simulateur/Validateurs.ts";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";

const validationUneReponses = (
  nomChamp: NomsChampsSimulateur,
): ValidationReponses => ({
  message: "Selectionnez une réponse",
  validateur: valideAuMoinsUn(nomChamp),
});
const validationReponsesTaille = {
  message: "Sélectionnez une réponse pour chaque critère",
  validateur: (donneesFormulaire: DonneesFormulaireSimulateur) =>
    valideAuMoinsUn("trancheNombreEmployes")(donneesFormulaire) &&
    valideAuMoinsUn("trancheCA")(donneesFormulaire),
};
const validationReponsesSecteurs = {
  message: "Sélectionnez au moins une réponse",
  validateur: valideAuMoinsUn("secteurActivite"),
};
const validationReponsesSousActivites = {
  message: "Sélectionnez au moins une réponse par secteur",
  validateur: valideAuMoinsUn("sousSecteurActivite"),
};
const validationReponsesActivites = {
  message: "Sélectionnez au moins une réponse par secteur",
  validateur: valideAuMoinsUn("activites"),
};
const informationEtapeDesignationOSE = new InformationEtapeForm(
  "Désignation éventuelle",
  validationUneReponses("designeOSE"),
  EtapeOSE,
);
const informationEtapeLocalisation = new InformationEtapeForm(
  "Localisation de l’activité",
  validationUneReponses("etatMembre"),
  EtapeLocalisation,
);
const informationEtapeTypeStructure = new InformationEtapeForm(
  "Type de structure",
  validationUneReponses("typeStructure"),
  EtapeTypeStructure,
);
const informationEtapeTaille = new InformationEtapeForm(
  "Taille de l’organisation",
  validationReponsesTaille,
  EtapeTaille,
);
const informationEtapeSousSecteurs = new InformationEtapeForm(
  "Sous-secteur d'activité",
  validationReponsesSousActivites,
  EtapeSousSecteurActivite,
);
const informationEtapeSecteurs = new InformationEtapeForm(
  "Secteurs d’activité",
  validationReponsesSecteurs,
  EtapeSecteurActivite,
  new SousEtapeConditionnelle(
    ({ secteurActivite }) => secteurActivite.includes("energie"),
    informationEtapeSousSecteurs,
  ),
);
const informationEtapeActivites = new InformationEtapeForm(
  "Activités pratiquées",
  validationReponsesActivites,
  EtapeActivite,
);
export const etapesQuestionnaire: CollectionInformationsEtapes =
  new CollectionInformationsEtapes(
    informationEtapeDesignationOSE,

    informationEtapeLocalisation,

    informationEtapeTypeStructure,

    informationEtapeTaille,
    informationEtapeSecteurs,
    informationEtapeActivites,
    new InformationEtapeResult("Resultat"),
  );
export const etatEtapesInitial = new EtatEtapes(etapesQuestionnaire, 1);
