import { DefaultComponent, DefaultProps } from "../Props.ts";
import EnTete from "./EnTete.tsx";
import PiedDePage from "./PiedDePage.tsx";

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
