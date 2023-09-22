import Header from "@codegouvfr/react-dsfr/Header";
import AnssiLogo from "../assets/ANSSI.svg";

const EnTete = () => (
  <Header
    brandTop={
      <>
        R&Eacute;PUBLIQUE
        <br />
        FRAN&Ccedil;AISE
      </>
    }
    homeLinkProps={{
      href: "/",
      title: "Accueil - MonPortailNIS2 - ANSSI",
    }}
    id="fr-header-header-with-quick-access-items"
    operatorLogo={{
      alt: "Logotype ANSSI",
      imgUrl: AnssiLogo,
      orientation: "horizontal",
    }}
    quickAccessItems={[
      {
        iconId: "fr-icon-live-fill",
        linkProps: { href: "https://www.dailymotion.com/video/x8l50hd" },
        text: "Webinaire de présentation",
      },
      {
        iconId: "fr-icon-question-fill",
        linkProps: { href: "#" },
        text: "FAQ NIS 2",
      },
    ]}
    serviceTagline=""
    serviceTitle="MonPortailNIS2"
  />
);

export default EnTete;
