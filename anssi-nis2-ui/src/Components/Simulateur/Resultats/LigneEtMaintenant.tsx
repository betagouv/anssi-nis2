import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";

export const LigneEtMaintenant = () => (
  <>
    <RowContainer className="fr-nis2-bordure-bas">
      <CenteredContainer>
        <h2 className="fr-text-action-high--blue-france fr-h1">
          Et Maintenant ?
        </h2>
        <p className="fr-text">
          La prochaine étape sera de créer votre espace ANSSI et d’y enregistrer
          votre entité&nbsp;: votre structure, vos contacts référents.
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
