import { Regulation } from "../../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { EtatRegulationDefinitivement } from "../../../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import { ens } from "../../../../../../commun/utils/services/sets.operations.ts";

export const etatRegulation_ReguleEE: EtatRegulationDefinitivement<"Regule"> = {
  decision: Regulation.Regule,
  _resultatEvaluationRegulation: "Definitif",
  typeEntite: "EntiteEssentielle",
  etapeEvaluee: "InformationsSecteur",
  causes: {
    Structure: {
      _categorieTaille: "Grand",
      typeStructure: "privee",
      trancheChiffreAffaire: "petit",
      trancheNombreEmployes: "moyen",
    },
    InformationsSecteur: {
      _categorieTaille: "Grand",
      secteurs: ens({
        secteurActivite: "sante",
        activites: ens("laboratoireReferenceUE"),
      }),
    },
  },
};
export const etatRegulation_ReguleEI: EtatRegulationDefinitivement<"Regule"> = {
  decision: Regulation.Regule,
  _resultatEvaluationRegulation: "Definitif",
  typeEntite: "EntiteImportante",
  etapeEvaluee: "InformationsSecteur",
  causes: {
    Structure: {
      _categorieTaille: "Grand",
      typeStructure: "privee",
      trancheChiffreAffaire: "petit",
      trancheNombreEmployes: "moyen",
    },
    InformationsSecteur: {
      _categorieTaille: "Grand",
      secteurs: ens({
        secteurActivite: "sante",
        activites: ens("laboratoireReferenceUE"),
      }),
    },
  },
};
export const etatRegulation_ReguleAutreEMDontFrance: EtatRegulationDefinitivement<"Regule"> =
  {
    decision: Regulation.Regule,
    _resultatEvaluationRegulation: "Definitif",
    typeEntite: "EntiteEssentielle",
    etapeEvaluee: "InformationsSecteur",
    causes: {
      Structure: {
        _categorieTaille: "Grand",
        typeStructure: "privee",
        trancheChiffreAffaire: "petit",
        trancheNombreEmployes: "moyen",
      },
      InformationsSecteur: {
        _categorieTaille: "Grand",
        secteurs: ens({
          _categorieTaille: "Grand",
          secteurActivite: "infrastructureNumerique",
          activites: ens("fournisseurReseauxCommunicationElectroniquesPublics"),
          localisationFournitureServicesNumeriques: ens("autre", "france"),
        }),
      },
    },
  };
export const etatRegulation_ReguleAutreEM: EtatRegulationDefinitivement<"Regule"> =
  {
    decision: Regulation.Regule,
    _resultatEvaluationRegulation: "Definitif",
    typeEntite: "AutreEtatMembreUE",
    etapeEvaluee: "InformationsSecteur",
    causes: {
      Structure: {
        _categorieTaille: "Grand",
        typeStructure: "privee",
        trancheChiffreAffaire: "petit",
        trancheNombreEmployes: "moyen",
      },
      InformationsSecteur: {
        _categorieTaille: "Grand",
        secteurs: ens({
          _categorieTaille: "Grand",
          secteurActivite: "infrastructureNumerique",
          activites: ens("fournisseurServicesInformatiqueNuage"),
          paysDecisionsCyber: "autre",
        }),
      },
    },
  };
export const etatRegulation_NonRegule: EtatRegulationDefinitivement<"NonRegule"> =
  {
    decision: Regulation.NonRegule,
    _resultatEvaluationRegulation: "Definitif",
    etapeEvaluee: "InformationsSecteur",
  };
export const etatRegulation_Incertain: EtatRegulationDefinitivement<"Incertain"> =
  {
    decision: Regulation.Incertain,
    _resultatEvaluationRegulation: "Definitif",
    etapeEvaluee: "InformationsSecteur",
    causes: {
      _tag: "EnAttenteTranspositionLoiFrancaise",
    },
  };
export const etatRegulation_Regule_RegistreNomDeDomaines: EtatRegulationDefinitivement<"Regule"> =
  {
    decision: Regulation.Regule,
    _resultatEvaluationRegulation: "Definitif",
    typeEntite: "EntiteEssentielle",
    etapeEvaluee: "InformationsSecteur",
    causes: {
      Structure: {
        _categorieTaille: "Grand",
        typeStructure: "privee",
        trancheChiffreAffaire: "petit",
        trancheNombreEmployes: "moyen",
      },
      InformationsSecteur: {
        _categorieTaille: "Grand",
        secteurs: ens({
          secteurActivite: "infrastructureNumerique",
          activites: ens("fournisseurServicesEnregristrementNomDomaine"),
          _categorieTaille: "Grand",
          paysDecisionsCyber: "france",
        }),
      },
    },
  };
export const etatRegulation_Regule_DORA: EtatRegulationDefinitivement<"Regule"> =
  {
    decision: Regulation.Regule,
    _resultatEvaluationRegulation: "Definitif",
    typeEntite: "EntiteImportante",
    etapeEvaluee: "InformationsSecteur",
    causes: {
      Structure: {
        _categorieTaille: "Grand",
        typeStructure: "privee",
        trancheChiffreAffaire: "petit",
        trancheNombreEmployes: "moyen",
      },
      InformationsSecteur: {
        _categorieTaille: "Grand",
        secteurs: ens({
          secteurActivite: "banqueSecteurBancaire",
          activites: ens("etablissementCredit"),
        }),
      },
    },
  };
