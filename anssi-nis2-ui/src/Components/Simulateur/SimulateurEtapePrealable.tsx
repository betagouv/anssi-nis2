import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { RowContainer } from "../General/RowContainer.tsx";
import { CenteredContainer } from "../General/CenteredContainer.tsx";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";

export const SimulateurEtapePrealable: SimulateurEtapeRenderedComponent = ({
  informationsBoutonsNavigation,
}: SimulateurEtapeRenderedProps) => (
  <>
    <RowContainer className="fr-py-3w">
      <CenteredContainer className="fr-background-alt--grey fr-nis2-bien-debuter">
        <h2>Pour bien débuter</h2>
        <div className="fr-pr-16w">
          <p>
            Ce test permet de cerner si votre entité sera concernée par la
            directive NIS 2, et ce dès 2024. Nous le tiendrons à jour au fil des
            précisions apportées par la transposition en droit français.
          </p>
          <p className="fr-text--bold">
            Si votre entité appartient à un groupe d’entreprises aux activités
            variées, ce test peut être réalisé pour chaque entreprise filiale,
            ou pour le groupe si celui-ci mène une activité économique.
          </p>
        </div>
        <div className="fr-btns-group--right">
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
      </CenteredContainer>
    </RowContainer>
  </>
);
