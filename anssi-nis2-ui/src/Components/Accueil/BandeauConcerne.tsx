import { Button } from "@codegouvfr/react-dsfr/Button";
import { libellesAccueil } from "../../References/LibellesAccueil.ts";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import { Link } from "react-router-dom";
import { DefaultComponent } from "../../Services/Props";

const BandeauConcerne: DefaultComponent = () => {
  return (
    <>
      <div className="fr-nis2-suis-je-concerne fr-pt-10w fr-pb-13w">
        <div className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-nis2-flottant fr-col-offset-0 fr-col-12">
              <h2 className="fr-h1">{libellesAccueil.concerne.titre}</h2>
              <p className="fr-text--lead">{libellesAccueil.concerne.resume}</p>
              <Link to={"/simulateur"}>
                <Button className="fr-btn" onClick={noRefClick}>
                  Débuter le test
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BandeauConcerne;
