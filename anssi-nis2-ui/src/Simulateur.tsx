import { DefaultComponent } from "./Services/Props.ts";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { ChargeurEtape } from "./Components/Simulateur/ChargeurEtape.tsx";
import { etatEtapesInitial } from "./Components/Simulateur/EtapesQuestionnaire.ts";

const Simulateur: DefaultComponent = () => {
  return (
    <MiseEnPage page={"simulateur"}>
      <ChargeurEtape etatEtapes={etatEtapesInitial} />
    </MiseEnPage>
  );
};

export default Simulateur;
