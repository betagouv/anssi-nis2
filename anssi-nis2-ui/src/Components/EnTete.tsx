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
      title: "Accueil - MonEspaceNIS2 - ANSSI",
    }}
    id="fr-header-header-with-quick-access-items"
    operatorLogo={{
      alt: "Agence Nationale de la Sécurité d'Information - ANSSI",
      imgUrl: AnssiLogo,
      orientation: "horizontal",
    }}
    serviceTagline=""
    serviceTitle={
      <>
        MonEspaceNIS2
        <sup className="fr-badge fr-badge--sm fr-badge--green-emeraude fr-ml-1w">
          Bêta
        </sup>
      </>
    }
  />
);

export default EnTete;
