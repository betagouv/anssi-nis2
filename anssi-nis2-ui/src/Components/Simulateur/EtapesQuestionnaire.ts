import {
  InformationEtapeForm,
  InformationEtapeResult,
  InformationsEtape,
  SousEtapeConditionnelle,
} from "./props.ts";
import {
  SimulateurEtape1,
  SimulateurEtape2,
  SimulateurEtape3,
  SimulateurEtape4,
  SimulateurEtape5,
} from "./index.ts";

export const etapesQuestionnaire: InformationsEtape[] = [
  new InformationEtapeForm(
    "Localisation de l’activité",
    "Sélectionnez une réponse",
    SimulateurEtape1,
  ),

  new InformationEtapeForm(
    "Type de structure",
    "Sélectionnez une réponse",
    SimulateurEtape2,
  ),
  new InformationEtapeForm(
    "Taille de l’organisation",
    "Sélectionnez une réponse pour chaque critère",
    SimulateurEtape3,
  ),
  new InformationEtapeForm(
    "Secteurs d’activité",
    "Sélectionnez au moins une réponse",
    SimulateurEtape4,
    new SousEtapeConditionnelle(
      ({ secteurActivite }) => secteurActivite.includes("energie"),
      SimulateurEtape2,
    ),
  ),
  new InformationEtapeForm(
    "Activités pratiquées",
    "Sélectionnez une réponse",
    SimulateurEtape5,
  ) /* */,
  new InformationEtapeResult("Resultat"),
];
