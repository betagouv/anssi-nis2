import { DefaultComponent } from "./Services/Props.ts";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { ChargeurEtape } from "./Components/Simulateur/ChargeurEtape.tsx";

const Simulateur: DefaultComponent = () => {
  return (
    <MiseEnPage page={"simulateur"}>
      <ChargeurEtape />
    </MiseEnPage>
  );
};

export default Simulateur;
