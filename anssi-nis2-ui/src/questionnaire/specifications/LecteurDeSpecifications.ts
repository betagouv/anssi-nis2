import { parse } from "papaparse";
import { Specifications } from "./Specifications.ts";
import { FabriqueDeSpecifications } from "./FabriqueDeSpecifications.ts";
import {
  SpecificationTexte,
  valideColonnesDuCSV,
} from "./FormatDesSpecificationsCSV.ts";

export class LecteurDeSpecifications {
  private readonly fabrique = new FabriqueDeSpecifications();

  lis(contenuCsv: string): Specifications[] {
    const lignes = parse<SpecificationTexte>(contenuCsv, {
      header: true,
      skipEmptyLines: true,
    });

    valideColonnesDuCSV(lignes.meta.fields!);

    return lignes.data.map((ligne) => this.fabrique.transforme(ligne));
  }
}
