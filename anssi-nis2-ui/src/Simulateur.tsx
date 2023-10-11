import { DefaultComponent } from "./Services/Props.d.ts";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { ChargeurEtape } from "./Components/Simulateur/ChargeurEtape.tsx";
import { BandeauConcerneSimulateur } from "./Components/Simulateur/BandeauConcerneSimulateur.tsx";

const Simulateur: DefaultComponent = () => {
  return (
    <MiseEnPage page={"simulateur"}>
      <BandeauConcerneSimulateur />
      <ChargeurEtape />
    </MiseEnPage>
  );
};

export default Simulateur;
