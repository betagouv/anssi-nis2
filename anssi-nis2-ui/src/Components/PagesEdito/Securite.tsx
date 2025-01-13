import { DefaultComponent } from "../../Services/Props";
import encartDesktop from "../../assets/encart-homologation/encartHomologation.desktop.png";
import encartTablette from "../../assets/encart-homologation/encartHomologation.tablette.png";
import encartMobile from "../../assets/encart-homologation/encartHomologation.mobile.png";

const Securite: DefaultComponent = () => {
  return (
    <>
      <p>
        L&apos;ANSSI soumet MonEspaceNIS2 à un rythme d&apos;homologation
        soutenu (tous les 6 mois) dans le cadre d&apos;une démarche de
        renforcement continue de la sécurité du service numérique.
      </p>
      <p>
        MonEspaceNIS2 est hébergé chez&nbsp;
        <a
          href="https://www.clever-cloud.com/fr/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Clever Cloud
        </a>
        &nbsp;prenant appui sur Cloud Temple qualifié SecNumCloud.
      </p>
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
    </>
  );
};

export default Securite;
