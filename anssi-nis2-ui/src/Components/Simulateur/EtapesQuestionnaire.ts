import {
  CollectionInformationsEtapes,
  InformationEtapeForm,
  InformationEtapeResult,
  SousEtapeConditionnelle,
} from "./props.ts";
import {
  Etape1Localisation,
  Etape2TypeStructure,
  Etape3Taille,
  Etape4Secteur,
  Etape5Activite,
} from "./index.ts";

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
        Etape2TypeStructure,
      ),
    ),
    new InformationEtapeForm(
      "Activités pratiquées",
      "Sélectionnez une réponse",
      Etape5Activite,
    ) /* */,
    new InformationEtapeResult("Resultat"),
  );
