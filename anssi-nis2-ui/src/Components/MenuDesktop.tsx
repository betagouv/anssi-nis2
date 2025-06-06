import { NavLink } from "react-router-dom";
import { DefaultComponent } from "../Services/Props";
import { bandeauMscPasEncoreVisible } from "./bandeauMscPasEncoreVisible.tsx";

export const MenuDesktop: DefaultComponent = () => {
  return (
    <nav className="fr-nis2-menu-desktop fr-nav">
      <ul className="fr-nav__list">
        <li className="fr-nav__item">
          <NavLink to="/">Accueil</NavLink>
        </li>
        <li className="fr-nav__item">
          <button
            className="fr-nav__btn"
            aria-expanded="false"
            aria-controls="lien-informer-sous-menu"
          >
            M&apos;informer
          </button>
          <div className="fr-collapse fr-menu" id="lien-informer-sous-menu">
            <ul className="fr-menu__list">
              <li>
                <NavLink className="fr-nav__link" to="/directive">
                  En synthèse
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="fr-nav__link"
                  to="https://aide.monespacenis2.cyber.gouv.fr"
                >
                  Pour aller plus loin
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="fr-nav__item">
          <NavLink to="/simulateur">Tester si mon entité est concernée</NavLink>
        </li>
        {bandeauMscPasEncoreVisible() ? null : (
          <li className="fr-nav__item">
            <NavLink
              to="https://messervices.cyber.gouv.fr/nis2/"
              target="_blank"
              rel="noreferrer"
            >
              Me faire accompagner
            </NavLink>
          </li>
        )}
        <li className="fr-nav__item">
          <NavLink to="/me-preparer">Me préparer à NIS&nbsp;2</NavLink>
        </li>
        <li className="fr-nav__item">
          <NavLink to="/infolettre">M&apos;abonner à la newsletter</NavLink>
        </li>
      </ul>
    </nav>
  );
};
