import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";

export const LigneEtMaintenant = () => (
  <>
    <RowContainer className="fr-background-alt--blue-france">
      <CenteredContainer>
        <h2 className="fr-text-action-high--blue-france fr-h1">
          Et maintenant ?
        </h2>
        <p className="fr-text">
          La prochaine étape est de vous déclarer auprès de l&apos;ANSSI en
          pré-enregistrant votre organisation
        </p>
        <a
          className="fr-nis2-bouton-principal"
          target="_blank"
          rel="noreferrer"
          href="https://club.ssi.gouv.fr/#/nis2/introduction"
        >
          Se pré-enregistrer
        </a>
      </CenteredContainer>
    </RowContainer>
  </>
);
