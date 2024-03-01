import { EtatRegulationDefinitif } from "../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import { getNomFichierPrecision } from "../../Components/Simulateur/Resultats/LigneResultat.aide.ts";
import { chargeContenuMarkdown } from "../depots/ChargeContenuMarkdown.depot.ts";
import { separeMarkdownParLignes } from "../Markdown/TransformeMarkdown.operations.ts";
import { precisionsResultatVide } from "../Simulateur/Props/ContenusResultatEligibilite.constantes.ts";
import { PrecisionsResultatProps } from "../Simulateur/Props/ContenusResultatEligibilite.declaration.ts";

export const fabriquePrecisionsResultatProps = (
  md: string,
): PrecisionsResultatProps => {
  const [principal, annexe] = separeMarkdownParLignes(md);
  return {
    principal: principal ?? "",
    annexe: annexe ?? "",
  };
};

export const chargeContenuPourEtat = async (
  etatRegulation: EtatRegulationDefinitif,
) =>
  chargeContenuMarkdown(
    getNomFichierPrecision(etatRegulation),
    fabriquePrecisionsResultatProps,
    precisionsResultatVide,
  );
