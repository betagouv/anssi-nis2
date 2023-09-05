import styled from "@emotion/styled";
import { SimulateurEtapeRenderedComponent } from "./simulateurProps.ts";
import SimulateurResterInformee from "./SimulateurResterInformee.tsx";
import { fr } from "@codegouvfr/react-dsfr";
import Icon from "@mui/material/Icon";
import { RowContainer } from "../RowContainer.tsx";
import { CenteredContainer } from "../CenteredContainer.tsx";
import ImageGuideTPEPME from "../../assets/GuideTPE-PME.png";
import ImageGuideHygieneCyber from "../../assets/GuideHygieneCyber.png";
import PdfCard from "./PdfCard.tsx";
import { PdfCardContainer } from "../PdfCardContainer.tsx";

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
      <RowContainer>
        <CenteredContainer>
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
              Sous réserve des mécanismes d&apos;exemption ou de désignation
              pouvant être mis en place au cas par cas par le gouvernement
              français pour certaines entités. Ces exemptions ou désignation
              seront connues au plus tard le 18 octobre 2024.
            </p>
          </ResultDiv>
        </CenteredContainer>
      </RowContainer>
      <RowContainer className="fr-background-alt--blue-france">
        <CenteredContainer>
          <SimulateurResterInformee />
        </CenteredContainer>
      </RowContainer>
      <RowContainer>
        <CenteredContainer>
          <h2 className="fr-text-action-high--blue-france fr-h1">
            Pour bien débuter
          </h2>
          <p className="fr-text">
            Dans l’attente des exigences françaises pour votre organisation,
            retrouvez les guides essentiels de bonne pratique de l’ANSSI pour
            débuter dès à présent votre montée en maturité cyber.
          </p>
          <PdfCardContainer>
            <PdfCard
              imageUrl={ImageGuideTPEPME}
              imageAlt="Guide d'Hygiène Informatique - Renforcer la sécurité de son système en 42 mesures"
              title="Guide d’hygiène cyber"
              linkProps={{
                href: "https://www.ssi.gouv.fr/uploads/2021/02/anssi-guide-tpe_pme.pdf",
              }}
            />
            <PdfCard
              imageAlt="Guide d'Hygiène Informatique - Renforcer la sécurité de son système en 42 mesures"
              imageUrl={ImageGuideHygieneCyber}
              linkProps={{
                href: "https://www.ssi.gouv.fr/uploads/2017/01/guide_hygiene_informatique_anssi.pdf",
              }}
              title="Guide d’hygiène cyber"
            />
          </PdfCardContainer>
        </CenteredContainer>
      </RowContainer>
    </>
  );
};
