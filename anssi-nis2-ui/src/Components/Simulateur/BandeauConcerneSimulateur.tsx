import { DefaultComponent } from "../../Services/Props";
import BlocPrincipal from "../BlocPrincipal.tsx";

export const BandeauConcerneSimulateur: DefaultComponent = () => (
  <BlocPrincipal className="fond-primaire" id="hero">
    <h1 className="texte-blanc">Mon entité est-elle concernée ?</h1>
    <p className="texte-blanc">
      Déterminez si votre entité est régulée par la directive NIS&nbsp;2
    </p>
  </BlocPrincipal>
);
