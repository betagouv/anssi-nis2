import { DefaultComponent } from "./Props.ts";
import React, { useState } from "react";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { SimulateurEtape } from "./Components/Simulateur/SimulateurEtape.tsx";
import {
  SimulateurEtape1,
  SimulateurEtape2,
  SimulateurEtape3,
  SimulateurEtape4,
  SimulateurEtape5,
} from "./Components/Simulateur";
import {
  InformationEtapeForm,
  InformationEtapeResult,
  InformationsEtape,
} from "./Components/Simulateur/simulateurProps.ts"

const Simulateur: DefaultComponent = () => {
  const [etapeCourante, setEtapeCourante] = useState(0);

  const soumissionEtape =
    (limitConditions: (i: number) => boolean, valeur: number) =>
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (limitConditions(valeur)) {
        setEtapeCourante(valeur);
      }
    };

  const etapeSuivante = soumissionEtape(
    (etape) => etape < 6,
    etapeCourante + 1,
  );
  const etapePrecedente = soumissionEtape(
    (etape) => etape >= 0,
    etapeCourante - 1,
  );

  const etapesQuestionnaire: InformationsEtape[] = [
    new InformationEtapeResult("Resultat"),

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
    ),
    new InformationEtapeForm(
      "Activités pratiquées",
      "Sélectionnez une réponse",
      SimulateurEtape5,
    ),
  ];

  return (
    <MiseEnPage page={"simulateur"}>
      <SimulateurEtape
        etapeCourante={etapeCourante}
        listeEtapes={etapesQuestionnaire}
        etapePrecedenteHandler={etapePrecedente}
        etapeSuivanteHandler={etapeSuivante}
      />
    </MiseEnPage>
  );
};

export default Simulateur;
