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
  SimulateurEtape6Resultat,
} from "./Components/Simulateur";
import {InformationEtapeResult, InformationsEtape, InformationsEtapeForm} from "./Services/simulateurFrontServices.ts";

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
    new InformationsEtapeForm(
      "Localisation de l’activité",
      "Sélectionnez une réponse",
      SimulateurEtape1,
    ),
    new InformationsEtapeForm(
      "Type de structure",
      "Sélectionnez une réponse",
      SimulateurEtape2,
    ),
    new InformationsEtapeForm(
      "Taille de l’organisation",
      "Sélectionnez une réponse pour chaque critère",
      SimulateurEtape3,
    ),
    new InformationsEtapeForm(
      "Secteurs d’activité",
      "Sélectionnez au moins une réponse",
      SimulateurEtape4,
    ),
    new InformationsEtapeForm(
      "Activités pratiquées",
      "Sélectionnez une réponse",
      SimulateurEtape5,
    ),
    new InformationEtapeResult(
      "Resultat",
      SimulateurEtape6Resultat,
      "white",
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
