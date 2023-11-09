import { Button } from "@codegouvfr/react-dsfr/Button";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import { Link } from "react-router-dom";
import { DefaultComponent } from "../../Services/Props";

const BandeauConcerne: DefaultComponent = () => {
  return (
    <>
      <div className="fr-nis2-suis-je-concerne fr-pt-10w fr-pb-13w">
        <div className="fr-nis2-flottant">
          <h2 className="fr-h1">Suis-je concerné ?</h2>
          <p className="fr-text--lead">
            Découvrez en 2 minutes si la directive NIS 2 peut s’appliquer à
            votre entité.
          </p>
          <Link to={"/simulateur"}>
            <Button className="fr-btn" onClick={noRefClick}>
              Débuter le test
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BandeauConcerne;
