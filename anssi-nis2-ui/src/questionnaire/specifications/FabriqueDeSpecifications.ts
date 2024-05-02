import { SpecificationEntiteOSE } from "./SpecificationEntiteOSE.ts";
import { Specification, Specifications } from "./Specifications.ts";
import { SpecificationLocalisation } from "./SpecificationLocalisation.ts";
import { SpecificationTexte } from "./FormatDesSpecificationsCSV.ts";

export class FabriqueDeSpecifications {
  transforme(specification: SpecificationTexte): Specifications {
    const transformations: Specification[] = [
      this.specificationOSE(specification),
      this.specificationLocalisation(specification),
    ].filter((s) => s !== undefined) as Specification[];

    return new Specifications(...transformations);
  }

  private specificationOSE = (
    specification: SpecificationTexte,
  ): SpecificationEntiteOSE | undefined => {
    const valeur = specification["Designation OSE"];

    if (!valeur) return;
    if (valeur === "Oui") return new SpecificationEntiteOSE(["oui"]);
    if (valeur === "Non / Ne sait pas")
      return new SpecificationEntiteOSE(["non", "nsp"]);

    throw new ErreurLectureDeSpecifications(valeur, "Designation OSE");
  };

  private specificationLocalisation(
    specification: SpecificationTexte,
  ): SpecificationLocalisation | undefined {
    const valeur = specification["Localisation"];

    if (!valeur) return;
    if (valeur === "France") return new SpecificationLocalisation(["france"]);

    throw new ErreurLectureDeSpecifications(valeur, "Localisation");
  }
}

class ErreurLectureDeSpecifications extends Error {
  constructor(valeurErreur: string, typeDeSpecification: string) {
    super(
      `La valeur ${valeurErreur} est invalide pour la spécification ${typeDeSpecification}`,
    );
  }
}
