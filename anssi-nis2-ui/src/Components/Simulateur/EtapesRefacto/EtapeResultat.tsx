import { LigneResultat } from "../Resultats/LigneResultat.tsx";
import { DonneesFormulaireSimulateur } from "anssi-nis2-core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { ConvertisseurDonneesBrutesVersEtatDonneesSimulateur } from "anssi-nis2-core/src/Domain/Simulateur/services/Eligibilite/ReponseEtat.fabriques.ts";
import {
  EtatRegulation,
  EtatRegulationDefinitif,
} from "anssi-nis2-core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import { evalueEtatRegulation } from "anssi-nis2-core/src/Domain/Simulateur/services/Eligibilite/EvalueEtatRegulation.ts";
import { LigneResterInformer } from "../Resultats/LigneResterInformer.tsx";
import {
  affichePdf,
  getModeFormulaireEmail,
} from "../SimulateurEtapeResult.aide.ts";
import { estRegule } from "anssi-nis2-core/src/Domain/Simulateur/Regulation.predicats.ts";
import { LigneEtMaintenant } from "../Resultats/LigneEtMaintenant.tsx";
import { EnSavoirPlus } from "../Resultats/EnSavoirPlus.tsx";
import { LigneBienDebuter } from "../Resultats/LigneBienDebuter.tsx";
import { LigneReseauxSociaux } from "../Resultats/LigneReseauxSociaux.tsx";
import { useEffect } from "react";

export const EtapeResultat = ({
  reponses,
  comparateurV1V2,
}: {
  reponses: DonneesFormulaireSimulateur;
  comparateurV1V2: (
    reponses: DonneesFormulaireSimulateur,
    regulationV1: EtatRegulationDefinitif,
  ) => void;
}) => {
  const donneesReponse =
    ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
      reponses,
    ) as EtatRegulation;
  const etatRegulation = evalueEtatRegulation(donneesReponse);

  useEffect(() => {
    comparateurV1V2(reponses, etatRegulation);
  }, [reponses, comparateurV1V2, etatRegulation]);

  const modeFormulaireEmail = getModeFormulaireEmail(etatRegulation.decision);

  return (
    <>
      <LigneResultat etatRegulation={etatRegulation} />
      <LigneResterInformer mode={modeFormulaireEmail} />
      {estRegule(etatRegulation.decision) && <LigneEtMaintenant />}
      {estRegule(etatRegulation.decision) && <EnSavoirPlus />}
      <LigneBienDebuter
        avecPdf={affichePdf(etatRegulation.decision)(reponses)}
      />
      <LigneReseauxSociaux />
    </>
  );
};
