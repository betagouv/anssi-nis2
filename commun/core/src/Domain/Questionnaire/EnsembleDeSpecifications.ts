import { Specifications } from "./Specifications";
import { EtatQuestionnaire } from "./EtatQuestionnaire";
import { ResultatAvecAnalyse } from "./ResultatAvecAnalyse";

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

    const resultat = choisisLeResultat(passants);

    return {
      resultat,
      specificationsRetenues: passants.map((p) => p.code),
    };
  }

  nombre() {
    return this.specifications.length;
  }
}

function choisisLeResultat(passants: Specifications[]) {
  passants.sort(prioriseLesSpecifications);

  const tousLesResumes = passants.flatMap(
    (p) => p.resultat().pointsAttention.resumes,
  );
  const toutesPrecisions = passants.flatMap(
    (p) => p.resultat().pointsAttention.precisions,
  );

  const resumesUniques = [...new Set(tousLesResumes)];
  const precisionsUniques = [...new Set(toutesPrecisions)];

  const laPlusStricte = passants[0];
  const resultatPlusStrict = laPlusStricte.resultat();

  return {
    ...resultatPlusStrict,
    pointsAttention: {
      resumes: resumesUniques,
      precisions: precisionsUniques,
    },
  };
}

function prioriseLesSpecifications(
  a: Specifications,
  b: Specifications,
): number {
  return a.ordreDePriorite() - b.ordreDePriorite();
}
