import FondHabillageAccueil from "../../assets/habillage-accueil-01.svg";
import { fr } from "@codegouvfr/react-dsfr";
import { CoolIllustration } from "../Echaffaudages/CoolIllustration.tsx";
import styled from "@emotion/styled";
import { DefaultComponent } from "../../Services/Props.d.ts";

const BandeauAccueilNis2 = styled.div`
  background: #f3f6fe url(${FondHabillageAccueil}) no-repeat bottom right;
`;

const AppelAction = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${fr.spacing("2w")};
`;

const MiseEnAvant = styled.p`
  background-color: var(--light-accent-green-emeraude-950, #c3fad5);
  width: fit-content;
`;

const BandeauAccueil: DefaultComponent = () => {
  return (
    <BandeauAccueilNis2>
      <div className="fr-container">
        <div className="fr-grid-row fr-pt-12w fr-pb-8w">
          <AppelAction className="fr-col">
            <div>
              <h1 className="fr-text-title--blue-france fr-mb-0">
                MonPortailNIS2
              </h1>
              <p className="fr-text--lead">
                Accompagner les organisations dans la compréhension
                <br />
                et la mise en conformité à NIS&nbsp;2
              </p>
            </div>
            <MiseEnAvant className="fr-text--bold fr-text--lg fr-px-1v fr-py-0-5v">
              Gratuit et 100% en ligne
            </MiseEnAvant>
          </AppelAction>
          <CoolIllustration />
        </div>
      </div>
    </BandeauAccueilNis2>
  );
};

export default BandeauAccueil;
