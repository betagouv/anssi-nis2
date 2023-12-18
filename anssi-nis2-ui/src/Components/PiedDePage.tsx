const PiedDePage = () => (
  <>
    <footer id="fr-footer" className="fr-footer" role="contentinfo">
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand fr-enlarge-link">
            <a href="/" title="Accueil - MonEspaceNIS2 - ANSSI">
              <p className="fr-logo">
                RÉPUBLIQUE
                <br />
                FRANÇAISE
              </p>
            </a>
          </div>
          <div className="fr-footer__content">
            <p className="fr-footer__content-desc">
              MonEspaceNIS2 accompagne les entités publiques et privées qui seront concernées par la directive européenne NIS 2 dans leur mise en conformité
              <br />
              <br />
              Il est développé par l&apos;Agence nationale de la sécurité des
              systèmes d&apos;information, en lien avec BetaGouv de la Direction
              interministérielle du numérique.
            </p>
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://legifrance.gouv.fr"
                  rel="noreferrer noopener"
                >
                  legifrance.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://gouvernement.fr"
                  rel="noreferrer noopener"
                >
                  gouvernement.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://service-public.fr"
                  rel="noreferrer noopener"
                >
                  service-public.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://data.gouv.fr"
                  rel="noreferrer noopener"
                >
                  data.gouv.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
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
                rel="noreferrer noopener"
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
