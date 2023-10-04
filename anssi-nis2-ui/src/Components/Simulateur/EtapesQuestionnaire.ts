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

export const etapesQuestionnaire: CollectionInformationsEtapes =
  new CollectionInformationsEtapes(
    new InformationEtapeForm(
      "Désignation éventuelle",
      "Selectionnez une réponse",
      EtapeOSE,
    ),

    new InformationEtapeForm(
      "Localisation de l’activité",
      "Sélectionnez une réponse",
      EtapeLocalisation,
    ),

    new InformationEtapeForm(
      "Type de structure",
      "Sélectionnez une réponse",
      EtapeTypeStructure,
    ),
    new InformationEtapeForm(
      "Taille de l’organisation",
      "Sélectionnez une réponse pour chaque critère",
      EtapeTaille,
    ),
    new InformationEtapeForm(
      "Secteurs d’activité",
      "Sélectionnez au moins une réponse",
      EtapeSecteurActivite,
      new SousEtapeConditionnelle(
        ({ secteurActivite }) => secteurActivite.includes("energie"),
        new InformationEtapeForm(
          "Sous-secteur d'activité",
          "Sélectionnez au moins une réponse par secteur",
          EtapeSousSecteurActivite,
        ),
      ),
    ),
    new InformationEtapeForm(
      "Activités pratiquées",
      "Sélectionnez au moins une réponse par secteur",
      EtapeActivite,
    ) /* */,
    new InformationEtapeResult("Resultat"),
  );
export const etatEtapesInitial = new EtatEtapes(etapesQuestionnaire, 1);
