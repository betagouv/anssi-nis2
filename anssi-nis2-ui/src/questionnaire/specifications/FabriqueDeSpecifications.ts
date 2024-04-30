import { SpecificationEntiteOSE } from "./SpecificationEntiteOSE.ts";
import { Specifications } from "./Specifications.ts";

export type SpecificationTexte = { "Designation OSE": string };

export class FabriqueDeSpecifications {
  transforme(specification: SpecificationTexte): Specifications {
    const valeur = specification["Designation OSE"];

    if (valeur === "Oui")
      return new Specifications(new SpecificationEntiteOSE(["oui"]));

    if (valeur === "Non / Ne sait pas")
      return new Specifications(new SpecificationEntiteOSE(["non", "nsp"]));

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
