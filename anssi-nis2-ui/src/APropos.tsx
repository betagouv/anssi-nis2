import { DefaultComponent } from "./Services/Props.ts";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { ChargeurEtape } from "./Components/Simulateur/ChargeurEtape.tsx";
import { BandeauConcerneSimulateur } from "./Components/Simulateur/BandeauConcerneSimulateur.tsx";

const APropos: DefaultComponent = () => {
  return (
    <MiseEnPage page={"a-propos"}>
      <BandeauConcerneSimulateur />
      <ChargeurEtape />
    </MiseEnPage>
  );
};

export default APropos;
