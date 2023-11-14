import { DefaultComponent } from "../../Services/Props";
import { liens } from "../../References/liens.tsx";

const APropos: DefaultComponent = () => {
  return (
    <>
      <p>
        MonEspaceNIS2 est une solution de cybersécurité conçue par le
        laboratoire d&apos;innovation de l&apos;ANSSI, en lien avec
        l&apos;incubateur BetaGouv de la direction interministérielle du
        numérique.
      </p>
      <p>
        Elle accompagne les entités publiques et privées qui seront concernées
        par la directive européenne NIS 2 dans leur mise en conformité.
      </p>
      <p>
        Cette solution est :
        <ul>
          <li>
            développée par une équipe de développeurs et de designers UX/UI via{" "}
            <a href="https://omnicite.fr/" title="Site internet Omnicité">
              Omnicité
            </a>
            &nbsp; ;
          </li>
          <li>
            hébergée chez{" "}
            <a href="https://scalingo.com/" title="Site internet Scalingo">
              Scalingo
            </a>{" "}
            prenant appui sur le Cloud 3DS d&apos;Outscale qualifié
            SecNumCloud&nbsp;;
          </li>
          <li>
            sous licence{" "}
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
        Pour toute question ou suggestion concernant les fonctionnalités de
        MonEspaceNIS2 ou sa sécurité, contactez l&apos;équipe à{" "}
        <a {...liens.emails.contactNis2}>contact-monespacenis2@ssi.gouv.fr</a>.
      </p>
    </>
  );
};

export default APropos;
