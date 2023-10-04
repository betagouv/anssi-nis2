import { DefaultComponent } from "./Services/Props.ts";

import MiseEnPage from "./Components/MiseEnPage.tsx";
import { BandeauBleuMarianne } from "./Components/BandeauBleuMarianne.tsx";

const APropos: DefaultComponent = () => {
  return (
    <MiseEnPage page={"a-propos"}>
      <BandeauBleuMarianne>
        <h2>À propos</h2>
      </BandeauBleuMarianne>
      <div className="fr-py-5w">
        <div className="fr-container">
          <div className="fr-grid-row  fr-my-0 fr-mx-auto fr-px-13w">
            <div className="fr-col texte-edito">
              <p>
                MonEspaceNIS2 est une solution de cybersécurité conçue par le
                laboratoire d&nbsp;innovation de l&nbsp;ANSSI, en lien avec
                l&nbsp;incubateur BetaGouv de la direction interministérielle du
                numérique.
              </p>
              <p>
                Elle accompagne les entités publiques et privées qui seront
                concernées par la directive européenne NIS 2 dans leur mise en
                conformité.
              </p>
              <p>
                Cette solution est :
                <ul>
                  <li>
                    développée par une équipe de développeurs et de designers
                    UX/UI via{" "}
                    <a
                      href="https://omnicite.fr/"
                      title="Site internet Omnicité"
                    >
                      Omnicité
                    </a>
                    ;
                  </li>
                  <li>
                    hébergée chez
                    <a
                      href="https://scalingo.com/"
                      title="Site internet Scalingo"
                    >
                      Scalingo
                    </a>
                    prenant appui sur le Cloud 3DS d&nbsp;Outscale qualifié
                    SecNumCloud;
                  </li>
                  <li>
                    sous licence
                    <a
                      href="https://github.com/betagouv/anssi-nis2/blob/main/LICENSE"
                      title="Licence Apache 2.0"
                    >
                      Apache-2.0
                    </a>
                    .
                  </li>
                </ul>
              </p>
              <p>
                <a
                  href="https://github.com/betagouv/anssi-nis2"
                  title="Code source sur GitHub"
                >
                  Le code est accessible en ligne.
                </a>
              </p>
              <p>
                Pour toute question ou suggestion concernant les fonctionnalités
                de MonEspaceNIS2 ou sa sécurité, contactez l&nbsp;équipe à
                <a
                  href="mailto:contact-monespacenis2@ssi.gouv.fr"
                  title="Nous écrire via email"
                >
                  contact-monespacenis2@ssi.gouv.fr
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </MiseEnPage>
  );
};

export default APropos;
