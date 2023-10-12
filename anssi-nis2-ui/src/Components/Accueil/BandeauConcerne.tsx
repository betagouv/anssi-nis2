import { Button } from "@codegouvfr/react-dsfr/Button";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.ts";
import { Link } from "react-router-dom";
import { DefaultComponent } from "../../Services/Props";
import { UppercaseH2 } from "../Styled/UppercaseH2.tsx";
import { BandeauBleuMarianne } from "../General/BandeauBleuMarianne.tsx";
import styled from "@emotion/styled";

const Centered = styled(BandeauBleuMarianne)`
  text-align: center;
`;

const BandeauConcerne: DefaultComponent = () => {
  return (
    <>
      <Centered className="fr-pt-10w fr-pb-13w">
        <UppercaseH2 className="fr-text-inverted--grey fr-mb-5w fr-h1">
          Suis-je concerné•e ?
        </UppercaseH2>
        <p className="fr-text--lead fr-text-inverted--grey fr-mb-5w">
          Découvrez en 2 min si la directive NIS&nbsp;2 peut s’appliquer à votre
          entité <br />
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
      </Centered>
    </>
  );
};

export default BandeauConcerne;
