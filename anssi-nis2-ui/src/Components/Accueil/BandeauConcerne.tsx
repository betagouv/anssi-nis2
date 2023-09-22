import { Button } from "@codegouvfr/react-dsfr/Button";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.ts";
import { Link } from "react-router-dom";

import styled from "@emotion/styled";
import { DefaultComponent } from "../../Services/Props.ts";

const SuisJeConcerneDiv = styled.div`
  background-color: #101070;
  text-align: center;
  h2: {
    text-transform: uppercase;
  }
`;

const UppercaseH2 = styled.h2`
  text-transform: uppercase;
`;

const BandeauConcerne: DefaultComponent = () => {
  return (
    <>
      <SuisJeConcerneDiv>
        <div className="fr-my-0 fr-mx-auto fr-px-15w fr-pt-10w fr-pb-13w">
          <UppercaseH2 className="fr-text-inverted--grey fr-mb-5w fr-h1">
            Suis-je concerné•e ?
          </UppercaseH2>
          <p className="fr-text--lead fr-text-inverted--grey fr-mb-5w">
            Découvrez en 2 min si la directive NIS&nbsp;2 peut s’appliquer à
            votre entité <br />
            et débutons ensemble votre accompagnement.
          </p>
          <Link to={"/simulateur"}>
            <Button
              className="fr-btn fr-btn--secondary fr-background-alt--blue-france fr-px-3w fr-pt-1-5v fr-pb-2v"
              onClick={noRefClick}
            >
              Débuter le test
            </Button>
          </Link>
        </div>
      </SuisJeConcerneDiv>
    </>
  );
};

export default BandeauConcerne;
