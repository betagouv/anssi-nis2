import { DefaultComponent } from "../../Services/Props";
import { RowContainer } from "../General/RowContainer.tsx";
import imageSrcMarches from "../../assets/marches.svg";

const BandeauAccueil: DefaultComponent = () => (
  <div className="fr-bandeau-marianne fr-nis2-accueil-principal">
    <div className="fr-my-0">
      <RowContainer>
        <div className="fr-container fr-pl-0">
          <div className="fr-grid-row ">
            <div className="fr-col-offset-0 fr-col-7 fr-nis2-appel-action">
              <div className="fr-pt-32v">
                <h1 className="fr-pt-3w">MonEspaceNIS2</h1>
                <p>
                  Accompagner les organisations dans la compréhension
                  <br />
                  et la mise en conformité à NIS&nbsp;2
                </p>
              </div>
            </div>
            <div className="fr-col-5">
              <img src={imageSrcMarches} alt="Personne montant les marches" />
            </div>
          </div>
        </div>
      </RowContainer>
    </div>
  </div>
);

export default BandeauAccueil;
