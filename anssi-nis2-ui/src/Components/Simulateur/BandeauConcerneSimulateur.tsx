import { libellesAccueil } from "../../References/LibellesAccueil.ts";
import { DefaultComponent } from "../../Services/Props";
import BlocPrincipal from "../BlocPrincipal.tsx";

export const BandeauConcerneSimulateur: DefaultComponent = () => (
  <BlocPrincipal className="fond-primaire" id="hero">
      <h1 className="texte-blanc">{libellesAccueil.concerne.titre}</h1>
      <p className="texte-blanc">{libellesAccueil.concerne.resume}</p>
  </BlocPrincipal>
);
