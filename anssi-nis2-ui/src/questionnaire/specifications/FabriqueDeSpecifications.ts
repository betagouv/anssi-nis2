import { SpecificationEntiteOSE } from "./SpecificationEntiteOSE.ts";

export class FabriqueDeSpecifications {
  lis(specificationTextuelle: { "Designation OSE": string }) {
    const valeur = specificationTextuelle["Designation OSE"];

    if (valeur === "Oui") return new SpecificationEntiteOSE(["oui"]);

    if (valeur === "Non / Ne sait pas")
      return new SpecificationEntiteOSE(["non", "nsp"]);

    throw new ErreurLectureDeSpecifications(valeur, "Designation OSE");
  }
}

class ErreurLectureDeSpecifications extends Error {
  constructor(valeurErreur: string, typeDeSpecification: string) {
    super(
      `La valeur ${valeurErreur} est invalide pour la spécification ${typeDeSpecification}`,
    );
  }
}
