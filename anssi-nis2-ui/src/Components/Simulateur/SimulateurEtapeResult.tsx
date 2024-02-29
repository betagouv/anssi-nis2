import { estRegule } from "../../../../commun/core/src/Domain/Simulateur/Regulation.predicats.ts";
import { ConvertisseurDonneesBrutesVersEtatDonneesSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique.ts";
import { EtatRegulation } from "../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import { evalueEtatRegulation } from "../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.operations.ts";
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
  const donneesReponse =
    ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
      donneesFormulaire,
    ) as EtatRegulation;
  const etatRegulation = evalueEtatRegulation(donneesReponse);
  const modeFormulaireEmail = getModeFormulaireEmail(etatRegulation.decision);
  return (
    <>
      <LigneResultat etatRegulation={etatRegulation} />
      <LigneResterInformer mode={modeFormulaireEmail} />
      {estRegule(etatRegulation.decision) && <LigneEtMaintenant />}
      {estRegule(etatRegulation.decision) && <EnSavoirPlus />}
      <LigneBienDebuter
        avecPdf={affichePdf(etatRegulation.decision)(donneesFormulaire)}
      />
      <LigneReseauxSociaux />
    </>
  );
};
