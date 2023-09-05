import styled from "@emotion/styled";
import { SimulateurEtapeRenderedComponent } from "./simulateurProps.ts";
import SimulateurResterInformee from "./SimulateurResterInformee.tsx";
import { fr } from "@codegouvfr/react-dsfr";
import Icon from "@mui/material/Icon";

const ResultDiv = styled.div`
  background-color: ${fr.colors.decisions.background.alt.greenMenthe.default};

  .fr-icon--xl {
    font-size: ${fr.spacing("6w")} !important;
  }

  .fr-icon--xl::before,
  .fr-icon--xl::after {
    --icon-size: ${fr.spacing("6w")};
  }
`;

const IconeEligible = styled.div`
  color: ${fr.colors.decisions.text.actionHigh.greenMenthe.default};
  text-align: center;
`;

const HeaderResult = styled.h4`
  color: ${fr.colors.decisions.text.actionHigh.greenMenthe.default};
`;

export const SimulateurEtapeResult: SimulateurEtapeRenderedComponent = () => {
  return (
    <>
      <ResultDiv className="fr-px-4w fr-py-3w">
        <div className="fr-grid-row">
          <IconeEligible className="fr-col">
            <Icon className="fr-icon-check-line fr-icon--xl" />
          </IconeEligible>
        </div>
        <HeaderResult>
          La directive s&apos;appliquerait à votre entité au vu des éléments
          saisis
        </HeaderResult>
        <p>
          Sous réserve des mécanismes d&apos;exemption ou de désignation pouvant
          être mis en place au cas par cas par le gouvernement français pour
          certaines entités. Ces exemptions ou désignation seront connues au
          plus tard le 18 octobre 2024.
        </p>
      </ResultDiv>
      <SimulateurResterInformee />
    </>
  );
};
