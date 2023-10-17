import { DefaultComponent, DefaultProps } from "../Services/Props";
import EnTete from "./EnTete.tsx";
import PiedDePage from "./PiedDePage.tsx";
import "../App.css";
import Matomo from "./Matomo.tsx";

const MiseEnPage: DefaultComponent = ({ children, page }: DefaultProps) => {
  return (
    <>
      <Matomo SiteId={49} JavascriptContainerHash={"NNMf7j9p"} />
      <EnTete />
      <main className={page} role="main">
        {children}
      </main>
      <PiedDePage />
    </>
  );
};

export default MiseEnPage;
