import { DefaultComponent } from "../../Services/Props";
import BlocPrincipal from "../BlocPrincipal.tsx";
import Marches from "../../assets/marches.svg";
import MarchesTablette from "../../assets/marches-tablette.svg";

const BandeauAccueil: DefaultComponent = () => (
    <BlocPrincipal className="fond-primaire" id="hero">
        <h1 className="texte-blanc">Directive NIS&nbsp;2</h1>
        <h2 className="texte-blanc">Élever collectivement notre niveau de cybersécurité</h2>
        <img src={Marches} alt="Illustration du Hero de la directive NIS 2" id="hero-mobile"/>
        <img src={MarchesTablette} alt="Illustration du Hero de la directive NIS 2" id="hero-tablette"/>
    </BlocPrincipal>
);

export default BandeauAccueil;
