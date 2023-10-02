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
      alt: "Agence Nationale de la Sécurité d'Information - ANSSI",
      imgUrl: AnssiLogo,
      orientation: "horizontal",
    }}
    quickAccessItems={[
      {
        iconId: "fr-icon-live-fill",
        linkProps: {
          href: "https://www.dailymotion.com/video/x8l50hd",
          title:
            "NIS 2 : Présentation de la directive et de sa transposition nationale",
          target: "_blank",
        },
        text: "Webinaire de présentation",
      },
      {
        iconId: "fr-icon-question-fill",
        linkProps: {
          href: "https://www.ssi.gouv.fr/directive-nis-2/",
          title: "Foire Aux Questions NIS 2 sur le site de l'ANSSI",
          target: "_blank",
        },
        text: "FAQ NIS 2",
      },
    ]}
    serviceTagline=""
    serviceTitle={
      <>
        MonPortailNIS2
        <sup className="fr-badge fr-badge--sm fr-badge--green-emeraude">
          Bêta
        </sup>
      </>
    }
  />
);

export default EnTete;
