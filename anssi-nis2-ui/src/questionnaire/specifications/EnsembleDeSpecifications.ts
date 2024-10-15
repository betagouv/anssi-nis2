import { Specifications } from "./Specifications.ts";
import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

export type ResultatAvecAnalyse = {
  resultat: ResultatEligibilite;
  specificationsRetenues: string[];
};

export class EnsembleDeSpecifications {
  constructor(private readonly specifications: Specifications[]) {}

  evalue(reponses: EtatQuestionnaire): ResultatAvecAnalyse {
    const passants = this.specifications.filter(
      (s) => s.evalue(reponses) !== undefined,
    );

    if (passants.length === 0) {
      const detail = JSON.stringify(reponses);
      throw new Error(
        `Aucune spécification ne correspond au questionnaire. ${detail}`,
      );
    }

    passants.sort(prioriseLesSpecifications);

    const tousLesResumes = passants.flatMap(
      (p) => p.resultat().pointsAttention.resumes,
    );
    const toutesPrecisions = passants.flatMap(
      (p) => p.resultat().pointsAttention.precisions,
    );

    const laPlusStricte = passants[0];

    const resultatPlusStrict = laPlusStricte.resultat();
    return {
      resultat: {
        ...resultatPlusStrict,
        pointsAttention: {
          ...resultatPlusStrict.pointsAttention,
          resumes: tousLesResumes,
          precisions: toutesPrecisions,
        },
      },
      specificationsRetenues: passants.map((p) => p.code),
    };
  }

  nombre() {
    return this.specifications.length;
  }
}

function prioriseLesSpecifications(
  a: Specifications,
  b: Specifications,
): number {
  return a.ordreDePriorite() - b.ordreDePriorite();
}
