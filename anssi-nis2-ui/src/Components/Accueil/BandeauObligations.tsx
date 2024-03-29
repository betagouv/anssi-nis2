import { ElementObligation } from "./ElementObligation.tsx";
import ObligationNotifier from "../../assets/obligation-notifier.svg";
import ObligationMesuresSecurite from "../../assets/obligation-mesures-securite.svg";
import ObligationIncidents from "../../assets/obligation-incidents.svg";

const BandeauObligations = () => (
  <div className="fr-nis2-accueil-directive-europeenne fr-pb-13w">
    <div className="fr-container">
      <div className="fr-mt-7w fr-pt-7w fr-nis2-obligations">
        <div className="fr-col--middle">
          <h3 className="fr-mb-5w">
            L&apos;ANSSI accompagne les entités concernées
            <br />dans leur mise en conformité
          </h3>
        </div>
        <ul className="fr-grid-row fr-mx-25v fr-pb-19v">
          <ElementObligation imageSrc={ObligationNotifier}>
            S&apos;enregistrer
            <br />
            auprès de l&apos;ANSSI
          </ElementObligation>
          <ElementObligation imageSrc={ObligationMesuresSecurite}>
            Mettre en œuvre
            <br />
            des mesures de sécurité
          </ElementObligation>
          <ElementObligation imageSrc={ObligationIncidents}>
            Déclarer les
            <br />
            incidents de sécurité
          </ElementObligation>
        </ul>
      </div>
    </div>
  </div>
);

export default BandeauObligations;
