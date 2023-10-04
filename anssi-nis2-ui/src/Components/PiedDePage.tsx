const PiedDePage = () => (
  <>
    <footer id="fr-footer" className="fr-footer" role="contentinfo">
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand fr-enlarge-link">
            <a href="/" title="Accueil - MonPortailNIS2 - ANSSI">
              <p className="fr-logo">
                RÉPUBLIQUE
                <br />
                FRANÇAISE
              </p>
            </a>
          </div>
          <div className="fr-footer__content">
            <p className="fr-footer__content-desc">
              MonParcoursNIS2 aide les entités publiques et privées à sécuriser
              et homologuer leurs services numériques au prisme des obligations
              de la directive européenne NIS2.
              <br />
              <br />
              Il est développé par l’Agence nationale de la sécurité des
              systèmes d’information, en lien avec BetaGouv de la Direction
              interministérielle du numérique.
            </p>
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://legifrance.gouv.fr"
                  rel="noreferrer"
                >
                  legifrance.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://gouvernement.fr"
                  rel="noreferrer"
                >
                  gouvernement.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://service-public.fr"
                  rel="noreferrer"
                >
                  service-public.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://data.gouv.fr"
                  rel="noreferrer"
                >
                  data.gouv.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            {/*<li className="fr-footer__bottom-item">*/}
            {/*  <a href="#" className="fr-footer__bottom-link">*/}
            {/*    Accessibilité: partiellement conforme*/}
            {/*  </a>*/}
            {/*</li>*/}
            <li className="fr-footer__bottom-item">
              <a href="/a-propos" className="fr-footer__bottom-link">
                A propos
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a href="/mentions-legales" className="fr-footer__bottom-link">
                Mentions légales
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a href="/gestion-des-cookies" className="fr-footer__bottom-link">
                Gestion des cookies
              </a>
            </li>
          </ul>
          <div className="fr-footer__bottom-copy">
            <p>
              Sauf mention contraire, tous les contenus de ce site sont sous{" "}
              <a
                href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                target="_blank"
                rel="noreferrer"
              >
                licence etalab-2.0
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </>
);
export default PiedDePage;
