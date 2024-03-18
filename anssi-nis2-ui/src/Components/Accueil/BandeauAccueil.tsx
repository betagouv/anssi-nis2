import { DefaultComponent } from "../../Services/Props";
import BlocPrincipal from "../BlocPrincipal.tsx";
import Marches from "../../assets/marches.svg";

const BandeauAccueil: DefaultComponent = () => (
    <BlocPrincipal className="fond-primaire" id="hero">
      <h1 className="texte-blanc">Directive NIS 2</h1>
      <h2 className="texte-blanc">Le portail MonEspaceNIS2 accompagne les entités dans leur mise en conformité.</h2>
      <img src={Marches} alt="Illustration du Hero de la directive NIS 2"/>
    </BlocPrincipal>
);

export default BandeauAccueil;
