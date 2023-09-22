import { Button } from "@codegouvfr/react-dsfr/Button";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.ts";
import CalendrierOctobre2024 from "../../assets/calendrier-oct-2024.svg";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  border-top: 4px solid var(--light-primary-blue-france-975, #f5f5fe);
  background-color: #f3f6fe;
`;
const BandeauQuandSePreparer = () => {
  return (
    <>
      <StyledDiv className="fr-pt-10w fr-pb-13w">
        <div className={"fr-container"}>
          <div className="fr-grid-row--center">
            <h2 className="fr-mb-7w">Quand se préparer ?</h2>
          </div>
          <div className="fr-grid-row">
            <div className="fr-col-5 calendrier">
              <img
                src={CalendrierOctobre2024}
                alt="Calendrier 'Octobre 2024'"
              />
            </div>
            <div className="fr-col">
              <p className="fr-text--lead fr-text--bold fr-pb-4v">
                La France a jusqu’au 17 octobre 2024 pour transposer les
                obligations de cette directive dans le droit national. Les
                délais de mise en conformité seront alors précisés et débuteront
                au plus tard le 18 octobre 2024.
              </p>
              <p className="fr-text--lead  fr-pb-4v">
                Pour estimer rapidement si votre entité peut être concernée et
                recevoir les futures informations concernant la directive,
                effectuez dès à présent le test de l’ANSSI.
              </p>
              <Link to={"/simulateur"}>
                <Button
                  className="fr-btn fr-px-3w fr-pt-1-5v fr-pb-2v"
                  onClick={noRefClick}
                >
                  Débuter le test
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </StyledDiv>
    </>
  );
};

export default BandeauQuandSePreparer;
