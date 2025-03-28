import { DefaultComponent, DefaultProps } from "../Services/Props";
import EnTete from "./EnTete.tsx";
import PiedDePage from "./PiedDePage.tsx";
import "../style/App.scss";
import Matomo from "./Matomo/Matomo.tsx";
import { Helmet } from "react-helmet";
import { BOM } from "./BOM/BOM.tsx";
import { BandeauDePromotionMSC } from "./BandeauDePromotionMSC.tsx";

const MiseEnPage: DefaultComponent = ({ children, page }: DefaultProps) => {
  return (
    <>
      <Helmet>
        <title>MonEspaceNIS2 - {page}</title>
      </Helmet>
      <Matomo
        SiteId={import.meta.env.VITE_MATOMO_SITE_ID}
        JavascriptContainerHash={import.meta.env.VITE_MATOMO_SCRIPT_HASH}
        GestionBalises={true}
      />
      <EnTete />
      <BandeauDePromotionMSC />
      <main className={page} role="main">
        {children}
      </main>
      <BOM />
      <PiedDePage />
    </>
  );
};

export default MiseEnPage;
