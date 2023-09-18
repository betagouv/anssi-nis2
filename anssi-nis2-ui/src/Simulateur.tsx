import { DefaultComponent } from "./Services/Props.ts";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { ChargeurEtape } from "./Components/Simulateur/ChargeurEtape.tsx";
import { etapesQuestionnaire } from "./Components/Simulateur/EtapesQuestionnaire.ts";
import { EtatEtapes } from "./Services/Simulateur/EtatEtapes.ts";

const Simulateur: DefaultComponent = () => {
  return (
    <MiseEnPage page={"simulateur"}>
      <ChargeurEtape
        listeEtapes={etapesQuestionnaire}
        etatEtapes={new EtatEtapes(etapesQuestionnaire, 1)}
      />
    </MiseEnPage>
  );
};

export default Simulateur;
