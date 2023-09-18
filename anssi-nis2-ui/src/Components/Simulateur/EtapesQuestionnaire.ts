import {
  Etape1Localisation,
  Etape2TypeStructure,
  Etape3Taille,
  Etape4Secteur,
  Etape5Activite,
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
      "Localisation de l’activité",
      "Sélectionnez une réponse",
      Etape1Localisation,
    ),

    new InformationEtapeForm(
      "Type de structure",
      "Sélectionnez une réponse",
      Etape2TypeStructure,
    ),
    new InformationEtapeForm(
      "Taille de l’organisation",
      "Sélectionnez une réponse pour chaque critère",
      Etape3Taille,
    ),
    new InformationEtapeForm(
      "Secteurs d’activité",
      "Sélectionnez au moins une réponse",
      Etape4Secteur,
      new SousEtapeConditionnelle(
        ({ secteurActivite }) => secteurActivite.includes("energie"),
        new InformationEtapeForm(
          "Sous-secteur d'activité",
          "Sélectionnez au moins une réponse",
          Etape2TypeStructure,
        ),
      ),
    ),
    new InformationEtapeForm(
      "Activités pratiquées",
      "Sélectionnez une réponse",
      Etape5Activite,
    ) /* */,
    new InformationEtapeResult("Resultat"),
  );
export const etatEtapesInitial = new EtatEtapes(etapesQuestionnaire, 1);
