import { DefaultComponent } from "./Services/Props";

import "./style/simulateur.scss";
import "./style/simulateur.petit-desktop.scss";
import MiseEnPage from "./Components/MiseEnPage.tsx";
import { ChargeurEtape } from "./Components/Simulateur/ChargeurEtape.tsx";
import { BandeauConcerneSimulateur } from "./Components/Simulateur/BandeauConcerneSimulateur.tsx";
import { MenuMobile } from "./Components/MenuMobile.tsx";
import { MenuDesktop } from "./Components/MenuDesktop.tsx";

const Simulateur: DefaultComponent = () => {
  return (
    <MiseEnPage page={"Suis-je concerné ?"}>
      <MenuMobile />
      <MenuDesktop />
      <div className="fr-nis2-simulateur">
        <BandeauConcerneSimulateur />
        <ChargeurEtape />
      </div>
    </MiseEnPage>
  );
};

export default Simulateur;
