import { DefaultComponent, DefaultProps } from "../Services/Props";
import EnTete from "./EnTete.tsx";
import PiedDePage from "./PiedDePage.tsx";
import "../style/App.scss";
import Matomo from "./Matomo/Matomo.tsx";
import { Helmet } from "react-helmet";
import { BOM } from "./BOM/BOM.tsx";
import { BandeauDePromotionMSC } from "./BandeauDePromotionMSC.tsx";
import { MenuMobile } from "./MenuMobile.tsx";

const MiseEnPage: DefaultComponent = ({ children, page }: DefaultProps) => {
  const estDansLeFutur = (dateString: string) =>
    new Date(dateString) > new Date();

  const pasEncoreVisible =
    !import.meta.env.VITE_MSC_BANDEAU_PROMOTION_DATE_DEBUT ||
    estDansLeFutur(import.meta.env.VITE_MSC_BANDEAU_PROMOTION_DATE_DEBUT);

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
      <div className="fr-nis2-conteneur-entete">
        <div className="fr-nis2-marges-entete">
          <div className="fr-nis2-entete-service">
            <EnTete />
          </div>
          <div className="fr-nis2-entete-conteneur-menu">
            {pasEncoreVisible ? null : (
              <lab-anssi-bouton-suite-cyber-navigation sourceUtm="MonEspaceNIS2"></lab-anssi-bouton-suite-cyber-navigation>
            )}
            <MenuMobile />
          </div>
        </div>
      </div>
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
