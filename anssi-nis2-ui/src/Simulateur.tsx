import { DefaultComponent } from "./Services/Props";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { ChargeurEtape } from "./Components/Simulateur/ChargeurEtape.tsx";
import { BandeauConcerneSimulateur } from "./Components/Simulateur/BandeauConcerneSimulateur.tsx";

const Simulateur: DefaultComponent = () => {
  return (
    <MiseEnPage page={"Suis-je concerné ?"}>
      <BandeauConcerneSimulateur />
      <ChargeurEtape />
    </MiseEnPage>
  );
};

export default Simulateur;
