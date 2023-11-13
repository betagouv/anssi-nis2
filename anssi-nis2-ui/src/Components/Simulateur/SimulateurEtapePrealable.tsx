import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { RowContainer } from "../General/RowContainer.tsx";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";
import ImageLocalisation from "../../assets/localisation-france.svg";

export const SimulateurEtapePrealable: SimulateurEtapeRenderedComponent = ({
  informationsBoutonsNavigation,
}: SimulateurEtapeRenderedProps) => (
  <>
    <RowContainer className="fr-py-3w fr-nis2-bien-debuter">
      <div className="fr-col-8 fr-background-alt--grey">
        <RowContainer align="left" className="fr-mt-7w">
          <div className="fr-col-offset-1 fr-col-6">
            <h2>Pour bien débuter</h2>
          </div>
        </RowContainer>
        <RowContainer align="left" className="">
          <div className="fr-col-offset-1 fr-col-6">
            <p>
              Ce test permet de cerner si votre entité sera concernée par la
              directive NIS 2, et ce dès 2024. Nous le tiendrons à jour au fil
              des précisions apportées par la transposition en droit français.
            </p>
            <p className="fr-text--bold">
              Si votre entité appartient à un groupe d’entreprises aux activités
              variées, ce test peut être réalisé pour chaque entreprise filiale,
              ou pour le groupe si celui-ci mène une activité économique.
            </p>
          </div>
          <div className="fr-col-3 fr-nis2-logo-localisation">
            <img
              src={ImageLocalisation}
              alt="Illustration localisations en France"
            />
          </div>
        </RowContainer>
        <RowContainer className="fr-mt-0 fr-mb-7w" align="left">
          <div className="fr-col-offset-5">
            <Button
              onClick={informationsBoutonsNavigation.precedent}
              priority="tertiary"
            >
              Revenir à l&apos;accueil
            </Button>
            <Button onClick={informationsBoutonsNavigation.suivant}>
              Débuter le test
            </Button>
          </div>
        </RowContainer>
      </div>
    </RowContainer>
  </>
);
