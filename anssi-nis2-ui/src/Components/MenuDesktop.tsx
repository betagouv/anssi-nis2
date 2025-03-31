import { NavLink } from "react-router-dom";
import { DefaultComponent } from "../Services/Props";
import { bandeauMscPasEncoreVisible } from "./bandeauMscPasEncoreVisible.tsx";

export const MenuDesktop: DefaultComponent = () => {
  return (
    <nav className="fr-nis2-menu-desktop">
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/directive">M&apos;informer sur la directive</NavLink>
      <NavLink to="/simulateur">Tester si mon entité est concernée</NavLink>
      {bandeauMscPasEncoreVisible() ? null : (
        <NavLink
          to="https://messervices.cyber.gouv.fr/nis2/"
          target="_blank"
          rel="noreferrer"
        >
          Me faire accompagner
        </NavLink>
      )}
      <NavLink to="/me-preparer">Me préparer à NIS&nbsp;2</NavLink>
      <NavLink to="/infolettre">M&apos;abonner à la newsletter</NavLink>
    </nav>
  );
};
