import { TamponResultat } from "./Resultats/TamponResultat.tsx";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { PointsAttention } from "./Resultats/PointsAttention.tsx";
import { RowContainer } from "../General/RowContainer.tsx";
import { CenteredContainer } from "../General/CenteredContainer.tsx";
import {
  affichePdf,
  getModeFormulaireEmail,
} from "./SimulateurEtapeResult.aide.ts";
import RestezInformes from "../RestezInformes.tsx";
import { LigneEtMaintenant } from "./Resultats/LigneEtMaintenant.tsx";
import { EnSavoirPlus } from "./Resultats/EnSavoirPlus.tsx";
import { estRegule } from "../../../../commun/core/src/Domain/Simulateur/Regulation.predicats.ts";
import { LigneBienDebuter } from "./Resultats/LigneBienDebuter.tsx";
import { LigneReseauxSociaux } from "./Resultats/LigneReseauxSociaux.tsx";
import { EtatQuestionnaire } from "../../../../commun/core/src/Domain/Questionnaire/EtatQuestionnaire";

export function EtapeResultatV2(props: {
  reponses: EtatQuestionnaire;
  resultat: ResultatEligibilite;
}) {
  return (
    <>
      <RowContainer>
        <CenteredContainer>
          <TamponResultat resultat={props.resultat} />
          <PointsAttention
            resumes={props.resultat.pointsAttention.resumes}
            precisions={props.resultat.pointsAttention.precisions}
          />
        </CenteredContainer>
      </RowContainer>
      {estRegule(props.resultat.regulation) && <LigneEtMaintenant />}
      <RowContainer>
        <CenteredContainer>
          <div className="fr-container">
            <h2 className="fr-text-action-high--blue-france fr-h1">
              Restez informés
            </h2>
          </div>
          <RestezInformes
            mode={getModeFormulaireEmail(props.resultat.regulation)}
          />
        </CenteredContainer>
      </RowContainer>
      {estRegule(props.resultat.regulation) && <EnSavoirPlus />}
      <LigneBienDebuter
        avecPdf={affichePdf(props.resultat.regulation)(props.reponses)}
      />
      <LigneReseauxSociaux />
    </>
  );
}
