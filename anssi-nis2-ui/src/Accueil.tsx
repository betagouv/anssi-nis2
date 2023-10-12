import "@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";
import "@gouvfr/dsfr/dist/utility/utility.css";

import { DefaultComponent } from "./Services/Props";
import {
  BandeauAccueil,
  BandeauConcerne,
  BandeauNis2EU,
  BandeauQuiEstANSSI,
  BandeauInformation,
  BandeauQuandSePreparer,
} from "./Components/Accueil";
import MiseEnPage from "./Components/MiseEnPage.tsx";

const Accueil: DefaultComponent = () => {
  return (
    <>
      <MiseEnPage page="Accueil">
        <BandeauAccueil />
        <BandeauConcerne />
        <BandeauNis2EU />
        <BandeauQuandSePreparer />
        <BandeauQuiEstANSSI />
        <BandeauInformation />
      </MiseEnPage>
    </>
  );
};

export default Accueil;
