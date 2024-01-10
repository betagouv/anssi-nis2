import { estRegule } from "../../../../commun/core/src/Domain/Simulateur/Regulation.predicats.ts";
import { calculePrecisionResultat } from "../../../../commun/core/src/Domain/Simulateur/Resultat.operations.ts";
import { calculeEligibilite } from "../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/Eligibilite.operations.ts";
import { transformeEligibiliteEnRegulationEntite } from "../../../../commun/core/src/Domain/Simulateur/services/Regulation/Regulation.operations.ts";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";
import { EnSavoirPlus } from "./Resultats/EnSavoirPlus.tsx";
import { LigneBienDebuter } from "./Resultats/LigneBienDebuter.tsx";
import { LigneEtMaintenant } from "./Resultats/LigneEtMaintenant.tsx";
import { LigneReseauxSociaux } from "./Resultats/LigneReseauxSociaux.tsx";
import { LigneResterInformer } from "./Resultats/LigneResterInformer.tsx";
import { LigneResultat } from "./Resultats/LigneResultat.tsx";
import {
  affichePdf,
  getModeFormulaireEmail,
} from "./SimulateurEtapeResult.aide.ts";

export const SimulateurEtapeResult: SimulateurEtapeRenderedComponent = ({
  donneesFormulaire,
}: SimulateurEtapeRenderedProps) => {
  const statutEligibiliteNIS2 = calculeEligibilite(donneesFormulaire);
  const regulationEntite = transformeEligibiliteEnRegulationEntite(
    statutEligibiliteNIS2,
  )(donneesFormulaire);
  const regulation = regulationEntite.decision;
  const precision = calculePrecisionResultat(regulation)(donneesFormulaire);
  const modeFormulaireEmail = getModeFormulaireEmail(regulation);
  return (
    <>
      <LigneResultat regulation={regulation} precision={precision} />
      <LigneResterInformer mode={modeFormulaireEmail} />
      {estRegule(regulation) && <LigneEtMaintenant />}
      {estRegule(regulation) && <EnSavoirPlus />}
      <LigneBienDebuter avecPdf={affichePdf(regulation)(donneesFormulaire)} />
      <LigneReseauxSociaux />
    </>
  );
};
