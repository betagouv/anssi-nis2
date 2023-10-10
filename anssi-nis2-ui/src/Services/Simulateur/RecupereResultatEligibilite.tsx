import { ResultatEligibilite } from "../../Domaine/Simulateur/resultatEligibilite.ts";

type ContenusResultatEligibilite = {
  titre: string;
  classIcone: string;
  explications: string;
};
type OperationRecupereContenusResultatEligibilite = (
  statutEligibiliteNIS2: ResultatEligibilite,
) => ContenusResultatEligibilite;

export const contenusResultatEligible: ContenusResultatEligibilite = {
  classIcone: "fr-icon-check-line",
  titre: "La directive s'appliquerait à votre entité au vu des éléments saisis",
  explications:
    "Sous réserve des mécanismes d'exemption ou de désignation pouvant " +
    "être mis en place au cas par cas par le gouvernement français pour " +
    "certaines entités. Ces exemptions ou désignation seront connues au " +
    "plus tard le 18 octobre 2024.",
};
export const recupereResultatEligibilite: OperationRecupereContenusResultatEligibilite =
  () => contenusResultatEligible;
