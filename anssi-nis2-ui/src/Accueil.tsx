import "@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";
import "@gouvfr/dsfr/dist/utility/utility.css";

import { DefaultComponent } from "./Services/Props";
import {
  BandeauAccueil,
  BandeauConcerne,
  BandeauNis2EU,
  BandeauQuiEstANSSI,
  BandeauInformationRS,
  BandeauQuandSePreparer,
  BandeauObligations,
} from "./Components/Accueil";
import MiseEnPage from "./Components/MiseEnPage.tsx";
import BandeauEnSavoirPlus from "./Components/Accueil/BandeauEnSavoirPlus.tsx";

const Accueil: DefaultComponent = () => {
  return (
    <>
      <MiseEnPage page="Accueil">
        <BandeauAccueil />
        <BandeauConcerne />
        <BandeauNis2EU />
        <BandeauObligations />
        <BandeauQuandSePreparer />
        <BandeauEnSavoirPlus />
        <BandeauQuiEstANSSI />
        <BandeauInformationRS />
      </MiseEnPage>
    </>
  );
};

export default Accueil;
