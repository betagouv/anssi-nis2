import { DefaultComponent } from "../../Services/Props.ts";
import { SuisJeConcerneDiv } from "../Styled/SuisJeConcerneDiv.tsx";
import { RowContainer } from "../RowContainer.tsx";

export const BandeauConcerneSimulateur: DefaultComponent = () => (
  <>
    <SuisJeConcerneDiv className="fr-py-5w">
      <RowContainer>
        <div className="fr-col-lg-10">
          <h2 className="fr-mb-1w">Suis-je concerné·e ?</h2>
          <p className="fr-mb-0">
            Découvrez si la directive NIS&nbsp;2 s’appliquera à votre entité
          </p>
        </div>
      </RowContainer>
    </SuisJeConcerneDiv>
  </>
);
