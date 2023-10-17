import { DefaultComponent } from "./Services/Props";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { ChargeurEtape } from "./Components/Simulateur/ChargeurEtape.tsx";
import { BandeauConcerneSimulateur } from "./Components/Simulateur/BandeauConcerneSimulateur.tsx";
import { AidezNousAmeliorerService } from "./Components/AidezNousAmeliorerService.tsx";
import { RowContainer } from "./Components/General/RowContainer.tsx";

const Simulateur: DefaultComponent = () => {
  return (
    <MiseEnPage page={"Suis-je concerné·e ?"}>
      <BandeauConcerneSimulateur />
      <ChargeurEtape />
      <RowContainer className=" fr-mb-7w">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
          <AidezNousAmeliorerService />
        </div>
      </RowContainer>
    </MiseEnPage>
  );
};

export default Simulateur;
