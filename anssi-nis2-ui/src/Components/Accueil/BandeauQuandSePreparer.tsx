import { Button } from "@codegouvfr/react-dsfr/Button";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import CalendrierOctobre2024 from "../../assets/calendrier-oct-2024.svg";
import { Link } from "react-router-dom";

const BandeauQuandSePreparer = () => {
  return (
    <>
      <div className="fr-bandeau-marianne fr-nis2-bandeau fr-py-10w">
        <div className={"fr-container"}>
          <div className="fr-grid-row--center">
            <h2 className="fr-mb-7w fr-h1">Calendrier</h2>
          </div>
          <div className="fr-grid-row">
            <div className="fr-col-5 calendrier">
              <img
                src={CalendrierOctobre2024}
                alt="Calendrier 'Octobre 2024'"
              />
            </div>
            <div className="fr-col">
              <p className="fr-text--lead fr-py-4v fr-mb-2w">
                La directive NIS 2 a été publiée le&nbsp;27 décembre
                2022&nbsp;au Journal Officiel de l&apos;Union européenne et
                prévoit un délai de 21 mois pour que chaque Etat membre
                transpose en droit national les différentes exigences
                réglementaires.
              </p>
              <p className="fr-text--lead fr-text--bold fr-mb-3v">
                NIS 2 rentrera en vigueur en France le 18 octobre 2024.
              </p>
              <p className="fr-text--lead fr-mb-4w">
                Pour estimer rapidement si votre entité est assujettie et
                recevoir des informations relatives à NIS 2, nous vous invitons
                à effectuer le test.
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
