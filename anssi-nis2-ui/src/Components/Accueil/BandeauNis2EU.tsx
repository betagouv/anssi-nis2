import { DefaultComponent } from "../../Services/Props";
import ObligationNotifier from "../../assets/obligation-notifier.svg";
import ObligationMesuresSecurite from "../../assets/obligation-mesures-securite.svg";
import ObligationMaj from "../../assets/obligation-maj.svg";
import ObligationIncidents from "../../assets/obligation-incidents.svg";
import { ElementObligation } from "./ElementObligation.tsx";
import { LogoUnionEuropeenneNIS2 } from "./LogoUnionEuropeenneNIS2.tsx";

const BandeauNis2EU: DefaultComponent = () => {
  return (
    <>
      <div className="fr-nis2-accueil-directive-europeenne fr-pb-13w">
        <div className="fr-container">
          <div className="fr-grid-row--center fr-pt-10w fr-pb-7w">
            <h2 className="fr-h1">
              NIS&nbsp;2, la nouvelle directive <br />
              européenne cyber
            </h2>
          </div>
          <div className="fr-grid-row fr-pb-4w">
            <div className="fr-col-5 fr-pt-4w  fr-col-offset-1">
              <p className="fr-h4">
                En France, la menace cybercriminelle et plus spécifiquement
                celle liée aux rançongiciels se maintient avec un regain
                d’activités fin 2022.
              </p>
              <p>
                Elle touche particulièrement les TPE, PME et ETI (40&nbsp;% des
                rançongiciels traités ou rapportés à l’ANSSI en 2022), les
                collectivités territoriales (23&nbsp;%) et les établissements
                publics de santé (10&nbsp;%).
              </p>
              <p>
                Plusieurs milliers d’entreprises et d’administrations publiques
                françaises seront donc soumises aux exigences de la nouvelle
                directive européenne sur la sécurité des réseaux et des systèmes
                d’information ou «&nbsp;directive NIS 2&nbsp;» afin de renforcer
                leur cybersécurité et harmoniser les pratiques à l’échelle
                européenne.
              </p>
            </div>
            <LogoUnionEuropeenneNIS2 />
          </div>
          <div className="fr-pt-4w fr-nis2-obligations">
            <div className="fr-col--middle traversant">
              {/* TODO: utiliser mise en avant adéquate */}
              <h3 className="fr-h4">
                Les entités concernées devront se conformer à certaines
                obligations auprès de l’ANSSI
              </h3>
            </div>
            <ul className="fr-grid-row">
              {/* TODO: améliorer les tiles/cards des obligations */}
              <ElementObligation
                title="S’enregistrer auprès de l'ANSSI"
                imageSrc={ObligationNotifier}
              />
              <ElementObligation
                title="Mettre en œuvre des mesures de sécurité"
                imageSrc={ObligationMesuresSecurite}
              />
              <ElementObligation
                title="Mettre à jour ses systèmes d'information"
                imageSrc={ObligationMaj}
              />
              <ElementObligation
                title="Déclarer les incidents de sécurité"
                imageSrc={ObligationIncidents}
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BandeauNis2EU;
