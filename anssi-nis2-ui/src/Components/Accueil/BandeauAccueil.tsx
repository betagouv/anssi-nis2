import { DefaultComponent } from "../../Services/Props";
import { RowContainer } from "../General/RowContainer.tsx";
// import imageSrcMarches from "../../assets/marches.svg";

const BandeauAccueil: DefaultComponent = () => (
  <div className="fr-bandeau-marianne fr-nis2-accueil-principal">
    <div className="fr-my-0">
      <RowContainer>
        <div className="fr-container fr-pl-0">
          <div className="fr-grid-row ">
            <div className="fr-col-offset-0 fr-col-8 fr-nis2-appel-action">
              <div className="fr-pt-32v">
                <h1 className="fr-pt-3w">MonEspaceNIS2</h1>
                <p>
                  Sensibiliser les organisations aux enjeux de la directive
                  NIS&nbsp;2
                  <br />
                  et les accompagner dans leur mise en conformité
                </p>
              </div>
            </div>
          </div>
        </div>
      </RowContainer>
    </div>
  </div>
);

export default BandeauAccueil;
