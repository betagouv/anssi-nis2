import Header from "@codegouvfr/react-dsfr/Header";
import AnssiLogo from "../assets/ANSSI.svg";
import Badge from "@codegouvfr/react-dsfr/Badge";

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
        MonEspaceNIS2{" "}
        <Badge noIcon severity="success">
          Bêta
        </Badge>
      </>
    }
  />
);

export default EnTete;
