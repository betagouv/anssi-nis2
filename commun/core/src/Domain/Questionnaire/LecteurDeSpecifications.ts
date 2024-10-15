import { parse } from "papaparse";
import { FabriqueDeSpecifications } from "./FabriqueDeSpecifications";
import {
  SpecificationTexte,
  valideColonnesDuCSV,
} from "./FormatDesSpecificationsCSV";
import { EnsembleDeSpecifications } from "./EnsembleDeSpecifications";

export class LecteurDeSpecifications {
  private readonly fabrique = new FabriqueDeSpecifications();

  lis(contenuCsv: string): EnsembleDeSpecifications {
    const lignes = parse<SpecificationTexte>(contenuCsv, {
      header: true,
      skipEmptyLines: true,
      delimiter: ";",
    });

    valideColonnesDuCSV(lignes.meta.fields!);

    return new EnsembleDeSpecifications(
      lignes.data.map((ligne) => this.fabrique.transforme(ligne)),
    );
  }
}
