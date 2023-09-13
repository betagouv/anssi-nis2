import { DefaultComponent } from "./Props.ts";
import React, { useState } from "react";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { SimulateurEtape } from "./Components/Simulateur/SimulateurEtape.tsx";
import { etapesQuestionnaire } from "./Components/Simulateur/EtapesQuestionnaire.ts";
import { GenerateurSoumissionEtape } from "./Components/Simulateur/simulateurProps.ts";

const Simulateur: DefaultComponent = () => {
  const [etapeCourante, setEtapeCourante] = useState(0);

  const soumissionEtape: GenerateurSoumissionEtape = (
    limiteConditions,
    nouvelleEtape,
  ) => {
    return (e: React.MouseEvent) => {
      const valeur = nouvelleEtape(etapeCourante);
      e.preventDefault();
      if (limiteConditions(valeur)) {
        setEtapeCourante(valeur);
      }
    };
  };

  return (
    <MiseEnPage page={"simulateur"}>
      <SimulateurEtape
        etapeCourante={etapeCourante}
        listeEtapes={etapesQuestionnaire}
        soumissionEtape={soumissionEtape}
      />
    </MiseEnPage>
  );
};

export default Simulateur;
