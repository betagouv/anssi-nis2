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
        SiteId={49}
        // JavascriptContainerHash={"NNMf7j9p"}
        JavascriptContainerHash={"NNMf7j9p_dev_b46d4f1aa1da1512de44eda0"}
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
