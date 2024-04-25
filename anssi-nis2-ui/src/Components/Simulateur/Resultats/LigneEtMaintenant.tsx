import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import EnCours from "../../../assets/in-progress.svg";

export const LigneEtMaintenant = () => (
  <>
    <RowContainer className="fr-nis2-bordure-bas">
      <CenteredContainer>
        <h2 className="fr-text-action-high--blue-france fr-h1">
          Et Maintenant ?
        </h2>
        <p className="fr-text">
          La prochaine étape sera de créer votre espace ANSSI et d’y enregistrer
          votre entité : votre structure, vos contacts référents.
        </p>
        <div className="fr-nis2-en-cours-developpement">
          <img src={EnCours} alt="Icone en cours" width={80} />
          <p>
            Cet espace est actuellement en cours de développement et sera mis à
            disposition au cours du <strong>premier semestre 2024</strong>. Nous
            vous tiendrons informés de son déploiement.
          </p>
        </div>
      </CenteredContainer>
    </RowContainer>
  </>
);
