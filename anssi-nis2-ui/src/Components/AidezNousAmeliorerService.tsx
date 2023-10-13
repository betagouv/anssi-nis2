import { DefaultComponent } from "../Services/Props";
import { emailContactNis2 } from "../References/liens.tsx";

export const AidezNousAmeliorerService: DefaultComponent = () => (
  <>
    <div className="fr-nis2-aidez-nous">
      <h6>Aidez-nous à améliorer le service</h6>
      <p>
        Des informations vous semblent manquer ou mériteraient d’être précisées
        ? Contactez-nous sur{" "}
        <a href={emailContactNis2.href} title={emailContactNis2.title}>
          contact-monespacenis2@ssi.gouv.fr
        </a>
      </p>
    </div>
  </>
);
