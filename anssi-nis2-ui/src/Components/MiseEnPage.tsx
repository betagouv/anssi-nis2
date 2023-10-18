import { DefaultComponent, DefaultProps } from "../Services/Props";
import EnTete from "./EnTete.tsx";
import PiedDePage from "./PiedDePage.tsx";
import "../App.css";
import Matomo from "./Matomo.tsx";
import { Helmet } from "react-helmet";

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
      <main className={page} role="main">
        {children}
      </main>
      <PiedDePage />
    </>
  );
};

export default MiseEnPage;
