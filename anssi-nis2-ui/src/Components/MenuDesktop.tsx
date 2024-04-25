import { NavLink } from "react-router-dom";
import { DefaultComponent } from "../Services/Props";

export const MenuDesktop: DefaultComponent = () => {
  return (
    <nav className="fr-nis2-menu-desktop">
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/directive">M’informer sur la directive</NavLink>
      <NavLink to="/simulateur">Tester si mon entité est concernée</NavLink>
    </nav>
  );
};
