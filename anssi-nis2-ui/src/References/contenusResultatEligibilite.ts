import { ContenusResultatEligibilite } from "../Services/Simulateur/contenusResultatEligibilite";
import { ResultatEligibilite } from "../Domaine/Simulateur/resultatEligibilite.ts";

export const contenusResultatEligible: ContenusResultatEligibilite = {
  classeDivResultat: "fr-nis2-eligible",
  classIcone: "fr-icon-check-line",
  titre: "La directive s'appliquerait à votre entité",
  pointsAttention: [
    {
      description:
        "Ce résultat est présenté au vu des éléments saisis et sous réserve " +
        "des mécanismes d'exemption ou de désignation pouvant être mis en " +
        "place au cas par cas par le gouvernement français pour certaines " +
        "entités. Ces exemptions ou désignations seront connues au plus " +
        "tard le 18 octobre 2024.",
    },
    {
      titre: "NEC",
      description:
        "Toute entité concernée par la directive " +
        "[UE 2022/2557](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32022L2557) " +
        "de Résilience des Entités Critiques est également soumise à NIS 2.",
    },
    {
      titre: "Sécurité nationale",
      description:
        "Si votre entité exerce une activité dans les domaines " +
        "de la sécurité nationale, de la sécurité publique, de la défense, " +
        "ou de l’application de la loi, et n’agit pas en tant que " +
        "prestataire de confiance, vous pourriez être exempté.",
    },
  ],
};

export const contenusResultatNonEligible: ContenusResultatEligibilite = {
  classeDivResultat: "fr-nis2-non-eligible",
  classIcone: "fr-icon-close-line",
  titre: "La directive ne s'appliquerait pas à votre entité",
  pointsAttention: [
    {
      description:
        "Ce résultat est présenté au vu des éléments saisis et sous réserve " +
        "des mécanismes d'exemption ou de désignation pouvant être mis en " +
        "place au cas par cas par le gouvernement français pour certaines " +
        "entités. Ces exemptions ou désignations seront connues au plus " +
        "tard le 18 octobre 2024.",
    },
    {
      titre: "Critères de possible inclusion",
      description:
        " - l’entité est, dans un État membre, le seul prestataire d’un " +
        "service qui est essentiel au maintien d’activités sociétales ou " +
        "économiques critiques;\n" +
        " - une perturbation du service fourni par l’entité pourrait avoir " +
        "un impact important sur la sécurité publique, la sûreté publique ou " +
        "la santé publique ;\n" +
        " - une perturbation du service fourni par l’entité pourrait induire " +
        "un risque systémique important, en particulier pour les secteurs " +
        "où cette perturbation pourrait avoir un impact transfrontière ;\n" +
        " - l’entité est critique en raison de son importance spécifique " +
        "au niveau national ou régional pour le secteur ou le type de " +
        "service en question, ou pour d’autres secteurs interdépendants " +
        "dans l’État membre ;",
    },
  ],
};

export const contenusResultats: Record<
  ResultatEligibilite,
  ContenusResultatEligibilite
> = {
  EligiblePetiteEntreprise: contenusResultatEligible,
  EligibleMoyenneGrandeEntreprise: contenusResultatEligible,
  NonEligible: contenusResultatNonEligible,
};
