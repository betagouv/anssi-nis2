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
export const etapesQuestionnaire: CollectionInformationsEtapes =
  new CollectionInformationsEtapes(
    new InformationEtapeForm(
      "Désignation éventuelle",
      validationUneReponses("designeOSE"),
      EtapeOSE,
    ),

    new InformationEtapeForm(
      "Localisation de l’activité",
      validationUneReponses("etatMembre"),
      EtapeLocalisation,
    ),

    new InformationEtapeForm(
      "Type de structure",
      validationUneReponses("typeStructure"),
      EtapeTypeStructure,
    ),

    new InformationEtapeForm(
      "Taille de l’organisation",
      {
        message: "Sélectionnez une réponse pour chaque critère",
        validateur: (donneesFormulaire: DonneesFormulaireSimulateur) =>
          valideAuMoinsUn("trancheNombreEmployes")(donneesFormulaire) &&
          valideAuMoinsUn("trancheCA")(donneesFormulaire),
      },
      EtapeTaille,
    ),
    new InformationEtapeForm(
      "Secteurs d’activité",
      {
        message: "Sélectionnez au moins une réponse",
        validateur: valideAuMoinsUn("secteurActivite"),
      },
      EtapeSecteurActivite,
      new SousEtapeConditionnelle(
        ({ secteurActivite }) => secteurActivite.includes("energie"),
        new InformationEtapeForm(
          "Sous-secteur d'activité",
          {
            message: "Sélectionnez au moins une réponse par secteur",
            validateur: valideAuMoinsUn("sousSecteurActivite"),
          },
          EtapeSousSecteurActivite,
        ),
      ),
    ),
    new InformationEtapeForm(
      "Activités pratiquées",
      {
        message: "Sélectionnez au moins une réponse par secteur",
        validateur: valideAuMoinsUn("activites"),
      },
      EtapeActivite,
    ),
    new InformationEtapeResult("Resultat"),
  );
export const etatEtapesInitial = new EtatEtapes(etapesQuestionnaire, 1);
