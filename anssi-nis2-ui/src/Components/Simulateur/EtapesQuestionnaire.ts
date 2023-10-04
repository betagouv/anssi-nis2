import {
  EtapeOSE,
  EtapeLocalisation,
  EtapeTypeStructure,
  EtapeTaille,
  EtapeSousSecteurActivite,
  EtapeSecteurActivite,
  EtapeActivite,
} from ".";
import { CollectionInformationsEtapes } from "../../Services/Simulateur/CollectionInformationsEtapes.ts";
import {
  InformationEtapeForm,
  InformationEtapeResult,
  SousEtapeConditionnelle,
} from "../../Services/Simulateur/informationsEtape.ts";
import { EtatEtapes } from "../../Services/Simulateur/EtatEtapes.ts";
import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

const validateurDesignationOSE = (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => donneesFormulaireSimulateur.designeOSE.length > 0;

export const etapesQuestionnaire: CollectionInformationsEtapes =
  new CollectionInformationsEtapes(
    new InformationEtapeForm(
      "Désignation éventuelle",
      {
        message: "Selectionnez une réponse",
        validateur: validateurDesignationOSE,
      },
      EtapeOSE,
    ),

    new InformationEtapeForm(
      "Localisation de l’activité",
      { message: "Sélectionnez une réponse", validateur: () => false },
      EtapeLocalisation,
    ),

    new InformationEtapeForm(
      "Type de structure",
      { message: "Sélectionnez une réponse", validateur: () => false },
      EtapeTypeStructure,
    ),

    new InformationEtapeForm(
      "Taille de l’organisation",
      {
        message: "Sélectionnez une réponse pour chaque critère",
        validateur: () => false,
      },
      EtapeTaille,
    ),
    new InformationEtapeForm(
      "Secteurs d’activité",
      { message: "Sélectionnez au moins une réponse", validateur: () => false },
      EtapeSecteurActivite,
      new SousEtapeConditionnelle(
        ({ secteurActivite }) => secteurActivite.includes("energie"),
        new InformationEtapeForm(
          "Sous-secteur d'activité",
          {
            message: "Sélectionnez au moins une réponse par secteur",
            validateur: () => false,
          },
          EtapeSousSecteurActivite,
        ),
      ),
    ),
    new InformationEtapeForm(
      "Activités pratiquées",
      {
        message: "Sélectionnez au moins une réponse par secteur",
        validateur: () => false,
      },
      EtapeActivite,
    ),
    new InformationEtapeResult("Resultat"),
  );
export const etatEtapesInitial = new EtatEtapes(etapesQuestionnaire, 1);
