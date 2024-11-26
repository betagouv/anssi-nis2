import { useState } from "react";
import { NavLink } from "react-router-dom";
import { DefaultComponent } from "../Services/Props";

import MenuBurger from "../assets/icone-burger.svg";

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
          <NavLink to="/infolettre">M&apos;abonner à la newsletter</NavLink>
          <NavLink
            to="https://aide.monespacenis2.cyber.gouv.fr"
            target="_blank"
            rel="noreferrer"
          >
            Consulter la FAQ
          </NavLink>
        </nav>
      )}
    </>
  );
};
