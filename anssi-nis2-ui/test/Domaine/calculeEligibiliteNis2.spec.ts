import { describe, expect, it } from "vitest";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { Activite } from "../../src/Domaine/Simulateur/Activite";

type ResultatEligibilite = "NonEligible" | "Eligible";

const ResultatEligibiliteEnum = {
  NonEligible: "NonEligible",
  Eligible: "Eligible",
} as const;

const eligibilite: (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ResultatEligibilite = ({
  etatMembre,
  typeStructure,
  trancheNombreEmployes,
  trancheCA,
  secteurActivite,
  activites,
}) => {
  if (
    etatMembre.includes("france") &&
    typeStructure.includes("privee") &&
    trancheNombreEmployes.includes("petit") &&
    trancheCA.includes("petit") &&
    secteurActivite.includes("infrastructureNumerique") &&
    !activites.includes("autreActiviteInfrastructureNumerique")
  )
    return ResultatEligibiliteEnum.Eligible;
  return ResultatEligibiliteEnum.NonEligible;
};
describe("Calcul d'éligibilité NIS 2", () => {
  it("doit calculer non-eligible si la seul activité cochée est 'autre...'", () => {
    const donneesSimu = {
      ...donneesFormulaireSimulateurVide,
      activites: ["autreActiviteEspace"] as Activite[],
    };
    expect(eligibilite(donneesSimu)).toStrictEqual(
      ResultatEligibiliteEnum.NonEligible,
    );
  });
  it(
    "doit calculer eligible si :" +
      " - l'entite est en 'France'" +
      " - le type structure est 'Privé'" +
      " - la taille est 'petite'" +
      " - le secteur d'activité est 'Infrastructure numérique'" +
      " - activité cochée n'est pas 'autre...'",
    () => {
      const donneesSimu: DonneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        etatMembre: ["france"],
        typeStructure: ["privee"],
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        secteurActivite: ["infrastructureNumerique"],
        activites: ["fournisseurReseauxCommunicationElectroniquesPublics"],
      };
      expect(eligibilite(donneesSimu)).toStrictEqual(
        ResultatEligibiliteEnum.Eligible,
      );
    },
  );
});
