import { DefaultComponent } from "../../Services/Props";
import BlocPrincipal from "../BlocPrincipal.tsx";
import Marches from "../../assets/marches.svg";
import MarchesTablette from "../../assets/marches-tablette.svg";
import Logo from "../../assets/logo-nis2.svg";

const BandeauAccueil: DefaultComponent = () => (
  <BlocPrincipal className="fond-primaire" id="hero">
    <h1 className="texte-blanc">
      Directive <img src={Logo} alt="NIS 2" />
    </h1>
    <h2 className="texte-blanc">
      Élever collectivement
      <br /> notre niveau de cybersécurité
    </h2>
    <img
      src={Marches}
      alt="Illustration du Hero de la directive NIS 2"
      id="hero-mobile"
    />
    <img
      src={MarchesTablette}
      alt="Illustration du Hero de la directive NIS 2"
      id="hero-tablette"
    />
  </BlocPrincipal>
);

export default BandeauAccueil;
