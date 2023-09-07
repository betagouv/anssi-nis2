import { DefaultComponent } from "./Props.ts";
import React, { useState } from "react";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { SimulateurEtape } from "./Components/Simulateur/SimulateurEtape.tsx";
import { etapesQuestionnaire } from "./EtapesQuestionnaire.ts";

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
    (etape) => etape < etapesQuestionnaire.length,
    etapeCourante + 1,
  );
  const etapePrecedente = soumissionEtape(
    (etape) => etape >= 0,
    etapeCourante - 1,
  );

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
