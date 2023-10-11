import { DefaultComponent, DefaultProps } from "../Services/Props.d.ts";
import EnTete from "./EnTete.tsx";
import PiedDePage from "./PiedDePage.tsx";
import "../App.css";

const MiseEnPage: DefaultComponent = ({ children, page }: DefaultProps) => {
  return (
    <>
      <EnTete />
      <main className={page} role="main">
        {children}
      </main>
      <PiedDePage />
    </>
  );
};

export default MiseEnPage;
