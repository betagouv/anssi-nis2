import { calculePrecisionResultat } from "../../../../commun/core/src/Domain/Simulateur/Resultat.operations.ts";
import { transformeEligibiliteEnRegulationEntite } from "../../../../commun/core/src/Domain/Simulateur/services/Regulation/Regulation.operations.ts";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { LigneReseauxSociaux } from "./Resultats/LigneReseauxSociaux.tsx";
import { LigneBienDebuter } from "./Resultats/LigneBienDebuter.tsx";
import { LigneResultat } from "./Resultats/LigneResultat.tsx";
import { LigneResterInformer } from "./Resultats/LigneResterInformer.tsx";
import { calculeEligibilite } from "../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/Eligibilite.operations.ts";
import { recupereContenusResultatEligibilite } from "../../Services/Simulateur/Operations/RecupereContenusResultatEligibilite.impl.ts";
import { SimulateurEtapeRenderedProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";
import { LigneEtMaintenant } from "./Resultats/LigneEtMaintenant.tsx";
import { EnSavoirPlus } from "./Resultats/EnSavoirPlus.tsx";

export const SimulateurEtapeResult: SimulateurEtapeRenderedComponent = ({
  donneesFormulaire,
}: SimulateurEtapeRenderedProps) => {
  const statutEligibiliteNIS2 = calculeEligibilite(donneesFormulaire);
  const contenuResultat = recupereContenusResultatEligibilite(
    statutEligibiliteNIS2,
  );
  const regulationEntite = transformeEligibiliteEnRegulationEntite(
    statutEligibiliteNIS2,
  )(donneesFormulaire);
  const precision = calculePrecisionResultat(regulationEntite.decision)(
    donneesFormulaire,
  );
  return (
    <>
      <LigneResultat
        regulation={regulationEntite.decision}
        precision={precision}
      />
      <LigneResterInformer mode={contenuResultat.modeFormulaireEmail} />
      {contenuResultat.blocs.has("etMaintenant") && <LigneEtMaintenant />}
      {contenuResultat.blocs.has("enSavoirPlus") && <EnSavoirPlus />}
      <LigneBienDebuter contenuResultat={contenuResultat} />
      <LigneReseauxSociaux />
    </>
  );
};
