import styled from "@emotion/styled";
import { Icon } from "@mui/material";
import { fr } from "@codegouvfr/react-dsfr";

const ResultDiv = styled.div`
  background-color: var(--light-accent-green-menthe-975, #dffdf7);
`;

const IconeEligible = styled.div`
  color: #37635f;
  text-align: center;
`;

const SimulateurEtape6Resultat = () => {
  return (
    <ResultDiv className="">
      <div className="fr-grid-row">
        <IconeEligible className="fr-col">
          <Icon className={fr.cx("fr-icon-check-line", "fr-text--xl")} />
        </IconeEligible>
      </div>
      <h4>
        La directive s&apos;appliquerait à votre entité au vu des éléments
        saisis
      </h4>
      <p>
        Sous réserve des mécanismes d&apos;exemption ou de désignation pouvant
        être mis en place au cas par cas par le gouvernement français pour
        certaines entités. Ces exemptions ou désignation seront connues au plus
        tard le 18 octobre 2024.
      </p>
    </ResultDiv>
  );
};

export default SimulateurEtape6Resultat;
