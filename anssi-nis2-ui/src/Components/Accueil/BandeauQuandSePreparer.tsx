import { Button } from "@codegouvfr/react-dsfr/Button";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import CalendrierOctobre2024 from "../../assets/calendrier-oct-2024.svg";
import { Link } from "react-router-dom";

const BandeauQuandSePreparer = () => {
  return (
    <>
      <div className="fr-bandeau-marianne fr-nis2-quand-se-preparer fr-pt-10w fr-pb-13w">
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
              <p className="fr-text--lead fr-pb-4v">
                La France a jusqu’au{" "}
                <span className="fr-text--bold">17 octobre 2024</span> pour
                transposer les obligations de cette directive dans le droit
                national. Les délais de mise en conformité seront alors précisés
                et débuteront au plus tard le 18 octobre 2024.
              </p>
              <p className="fr-text--lead fr-text--bold fr-pb-4v">
                Pour estimer rapidement si votre entité peut être concernée et
                recevoir des informations concernant la directive, effectuez dès
                à présent une simulation de l’ANSSI.
              </p>
              <Link to={"/simulateur"}>
                <Button
                  className="fr-btn fr-nis2-mise-en-avant fr-px-3w fr-pt-1-5v fr-pb-2v"
                  onClick={noRefClick}
                >
                  Débuter le test
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BandeauQuandSePreparer;
