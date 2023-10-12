import { DefaultComponent } from "../../Services/Props";
import { fr } from "@codegouvfr/react-dsfr";
import styled from "@emotion/styled";

const DivIllustrationInterieure = styled.div`
  width: 80%;
  height: 100%;
  gap: ${fr.spacing("1w")};
  border-radius: ${fr.spacing("2w")};
  display: flex;
  color: ${fr.colors.decisions.text.default.grey.default};
  align-items: center;
  text-align: center;
  background: var(--primary-white, #fff);
  opacity: 0.3;
  border: 2px dashed #2f3a43;
`;
const TitreIllustration = styled.h2`
  text-align: center;
  font-weight: 500;
  width: 100%;
`;
export const CoolIllustration: DefaultComponent = () => {
  return (
    <div className="fr-col-4">
      <DivIllustrationInterieure className="fr-p-1w">
        <TitreIllustration>
          Insert cool
          <br /> illustration here
        </TitreIllustration>
      </DivIllustrationInterieure>
    </div>
  );
};
