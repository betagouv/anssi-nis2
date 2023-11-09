import { DefaultComponent } from "../../Services/Props";
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
        </div>
      </div>
    </>
  );
};

export default BandeauNis2EU;
