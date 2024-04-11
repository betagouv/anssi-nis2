import { expect, describe, it } from "vitest";
import { executer } from "./reducerQuestionnaire.aide";
import {
  valideActivites,
  valideEtapeAppartenanceUE,
  valideEtapeDesignation,
  valideLocalisationEtablissementPrincipal,
  valideLocalisationServicesNumeriques,
  valideSecteursActivite,
  valideTailleEntitePrivee,
  valideTypeStructure,
} from "../../src/questionnaire/actions";
import { ConvertisseurDonneesBrutesVersEtatDonneesSimulateur } from "../../../commun/core/src/Domain/Simulateur/services/Eligibilite/ReponseEtat.fabriques";
import {
  EtatRegulation,
  EtatRegulationDefinitivement,
} from "../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import { evalueEtatRegulation } from "../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EvalueEtatRegulation";

describe("L'évaluation de l'état de régulation", () => {
  it("priorise « Régulé EE » quand « Régulé EI » et « Régulé EE » sont possibles (cas des 2 questions combinées sur les localisations)", () => {
    const questionnaire = executer([
      valideEtapeDesignation(["non"]),
      valideEtapeAppartenanceUE(["france"]),
      valideTypeStructure(["privee"]),
      valideTailleEntitePrivee(["petit"], ["petit"]),
      valideSecteursActivite(["infrastructureNumerique"]),
      valideActivites([
        "fournisseurReseauxCommunicationElectroniquesPublics",
        "fournisseurServicesDNS",
      ]),
      valideLocalisationEtablissementPrincipal(["france"], [], []),
      valideLocalisationServicesNumeriques(["france"]),
    ]);

    const donneesReponse =
      ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
        questionnaire,
      ) as EtatRegulation;

    const etatRegulation = evalueEtatRegulation(
      donneesReponse,
    ) as EtatRegulationDefinitivement<"Regule">;

    expect(etatRegulation.decision).toBe("Regule");
    expect(etatRegulation.typeEntite).toBe("EntiteEssentielle");
  });

  it("priorise « Régulé EE » sur « Régulé EI » pour une ME (cas des 2 questions combinées sur les localisations)", () => {
    const questionnaire = executer([
      valideEtapeDesignation(["non"]),
      valideEtapeAppartenanceUE(["france"]),
      valideTypeStructure(["privee"]),
      valideTailleEntitePrivee(["moyen"], ["petit"]),
      valideSecteursActivite(["infrastructureNumerique"]),
      valideActivites([
        "fournisseurReseauxCommunicationElectroniquesPublics",
        "fournisseurServicesInformatiqueNuage",
      ]),
      valideLocalisationEtablissementPrincipal(["france"], [], []),
      valideLocalisationServicesNumeriques(["france"]),
    ]);

    const donneesReponse =
      ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
        questionnaire,
      ) as EtatRegulation;

    const etatRegulation = evalueEtatRegulation(
      donneesReponse,
    ) as EtatRegulationDefinitivement<"Regule">;

    expect(etatRegulation.decision).toBe("Regule");
    expect(etatRegulation.typeEntite).toBe("EntiteEssentielle");
  });
  it("priorise « Régulé EE » sur « Régulé EI » pour une GE (cas des 2 questions combinées sur les localisations)", () => {
    const questionnaire = executer([
      valideEtapeDesignation(["non"]),
      valideEtapeAppartenanceUE(["france"]),
      valideTypeStructure(["privee"]),
      valideTailleEntitePrivee(["moyen"], ["grand"]),
      valideSecteursActivite(["infrastructureNumerique"]),
      valideActivites([
        "fournisseurReseauxCommunicationElectroniquesPublics",
        "fournisseurServicesInformatiqueNuage",
      ]),
      valideLocalisationEtablissementPrincipal(["france"], [], []),
      valideLocalisationServicesNumeriques(["france"]),
    ]);

    const donneesReponse =
      ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
        questionnaire,
      ) as EtatRegulation;

    const etatRegulation = evalueEtatRegulation(
      donneesReponse,
    ) as EtatRegulationDefinitivement<"Regule">;

    expect(etatRegulation.decision).toBe("Regule");
    expect(etatRegulation.typeEntite).toBe("EntiteEssentielle");
  });

  it.todo(
    "priorise « Régulé EE » sur « Régulé mais voir EM » (cas des 2 questions combinées sur les localisations)",
  );
  it.todo(
    "priorise « Régulé EE » sur « Non régulé, hors UE » (cas des 2 questions combinées sur les localisations)",
  );

  it.todo(
    "priorise « Régulé EI » sur « Régulé mais voir EM » (cas des 2 questions combinées sur les localisations)",
  );
  it.todo(
    "priorise « Régulé EI » sur « Non régulé, hors UE » (cas des 2 questions combinées sur les localisations)",
  );
});
