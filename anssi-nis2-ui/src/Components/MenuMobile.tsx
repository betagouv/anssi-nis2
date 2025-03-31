import { useState } from "react";
import { NavLink } from "react-router-dom";
import { DefaultComponent } from "../Services/Props";

import MenuBurger from "../assets/icone-burger.svg";
import { bandeauMscPasEncoreVisible } from "./bandeauMscPasEncoreVisible.tsx";

export const MenuMobile: DefaultComponent = () => {
  const [ouvert, setOuvert] = useState<boolean>(false);

  return (
    <>
      <button className="fr-nis2-menu-burger" onClick={() => setOuvert(true)}>
        <img src={MenuBurger} alt="Menu burger" />
      </button>
      {ouvert && (
        <nav className="fr-nis2-menu-mobile">
          <button
            className="fr-nis2-menu-mobile-fermer"
            onClick={() => setOuvert(false)}
          >
            Fermer
          </button>
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
      )}
    </>
  );
};
