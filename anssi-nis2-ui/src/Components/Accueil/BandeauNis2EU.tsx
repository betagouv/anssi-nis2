import { DefaultComponent } from "../../Services/Props";
import { LogoUnionEuropeenneNIS2 } from "./LogoUnionEuropeenneNIS2.tsx";

const BandeauNis2EU: DefaultComponent = () => (
  <>
    <div className="fr-nis2-accueil-directive-europeenne fr-pb-13w">
      <div className="fr-container">
        <div className="fr-grid-row--center fr-pt-10w fr-pb-7w">
          <h2 className="fr-h1">Directive NIS&nbsp;2</h2>
          <h3>
            pour une cybersécurité renforcée en France
            <br />
            et au sein de l’Union Européene
          </h3>
        </div>
        <div className="fr-grid-row fr-pb-4w">
          <div className="fr-col-5 fr-pt-4w  fr-col-offset-1">
            <p className="fr-h4">
              En France, la menace cybercriminelle et plus spécifiquement celle
              liée aux rançongiciels se maintient avec un regain d’activités fin
              2022.
            </p>
            <p>
              Elle touche particulièrement les TPE, PME et ETI (40&nbsp;% des
              rançongiciels traités ou rapportés à l’ANSSI en 2022), les
              collectivités territoriales (23&nbsp;%) et les établissements
              publics de santé (10&nbsp;%).
            </p>
            <p>
              Selon certains critères, les entreprises du secteur privé, les
              administrations publiques et les collectivités territoriales
              devront désormais appliquer les exigences de la directive qui
              visent à renforcer leur cybersécurité et instaurer une
              harmonisation des pratiques de sécurité&nbsp;à&nbsp;travers les
              États membres de l’Union Européenne.
            </p>
          </div>
          <LogoUnionEuropeenneNIS2 />
        </div>
      </div>
    </div>
  </>
);

export default BandeauNis2EU;
