import { DefaultComponent } from "../../Services/Props";
import { RowContainer } from "../General/RowContainer.tsx";

const BandeauAccueil: DefaultComponent = () => {
  return (
    <div className="fr-pt-5w fr-bandeau-marianne fr-nis2-accueil-principal">
      <div className="fr-my-0 fr-mx-auto">
        <RowContainer>
          <div className="fr-container">
            <div className="fr-grid-row fr-pt-12w">
              <div className="fr-col fr-nis2-appel-action">
                <div>
                  <h1>MonEspaceNIS2</h1>
                  <p>
                    Accompagner les organisations dans la compréhension
                    <br />
                    et la mise en conformité à NIS&nbsp;2
                  </p>
                </div>
                <p className="fr-nis2-mise-en-avant">
                  Gratuit et 100% en ligne
                </p>
              </div>
            </div>
          </div>
        </RowContainer>
      </div>
    </div>
  );
};

export default BandeauAccueil;
