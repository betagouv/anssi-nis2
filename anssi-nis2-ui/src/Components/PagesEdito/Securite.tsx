import { DefaultComponent } from "../../Services/Props";
import encartDesktop from "../../assets/encart-homologation/encartHomologation.desktop.png";
import encartTablette from "../../assets/encart-homologation/encartHomologation.tablette.png";
import encartMobile from "../../assets/encart-homologation/encartHomologation.mobile.png";

const Securite: DefaultComponent = () => {
  return (
    <>
      <img
        className="encart-homologation encart-desktop"
        src={encartDesktop}
        alt="Encart d'homologation de MonEspaceNIS2"
      />
      <img
        className="encart-homologation encart-tablette"
        src={encartTablette}
        alt="Encart d'homologation de MonEspaceNIS2"
      />
      <img
        className="encart-homologation encart-mobile"
        src={encartMobile}
        alt="Encart d'homologation de MonEspaceNIS2"
      />
      <lab-anssi-resume-pssi nomService="MonEspaceNIS2"></lab-anssi-resume-pssi>
    </>
  );
};

export default Securite;
