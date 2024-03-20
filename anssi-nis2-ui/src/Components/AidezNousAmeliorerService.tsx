import { DefaultComponent } from "../Services/Props";
import { liens } from "../References/liens.tsx";
import FAQ from "../assets/faq.svg";

export const AidezNousAmeliorerService: DefaultComponent = () => (
    <div className="fr-nis2-aidez-nous">
        <img src={FAQ} alt="Icone de la FAQ" width={80}/>
        <div>
          <h6>Aidez-nous à améliorer le service</h6>
          <p>
            Des informations vous semblent manquer ou mériteraient d’être précisées
            ? Contactez-nous sur{" "}
            <a {...liens.emails.contactNis2}>contact-monespacenis2@ssi.gouv.fr</a>
          </p>
        </div>
    </div>
);
