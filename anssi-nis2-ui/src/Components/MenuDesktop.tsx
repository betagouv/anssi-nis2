import { NavLink } from "react-router-dom";
import { DefaultComponent } from "../Services/Props";

export const MenuDesktop: DefaultComponent = () => {
  return (
    <nav className="fr-nis2-menu-desktop">
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/directive">M&apos;informer sur la directive</NavLink>
      <NavLink to="/simulateur">Tester si mon entité est concernée</NavLink>
      <NavLink to="/infolettre">M&apos;abonner à la newsletter</NavLink>
      <NavLink
        to="https://aide.monespacenis2.cyber.gouv.fr"
        target="_blank"
        rel="noreferrer"
      >
        Consulter la FAQ
      </NavLink>
    </nav>
  );
};
