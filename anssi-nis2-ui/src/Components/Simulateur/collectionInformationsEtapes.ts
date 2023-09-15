import {
  InformationEtapeForm,
  InformationsEtape,
} from "./informationsEtape.ts";
import { DonneesFormulaireSimulateur } from "../../Services/Simulateur/donneesFormulaire.ts";
// import { DonneesFormulaireSimulateur } from "../../Services/Simulateur/donneesFormulaire.ts";

const dansIntervale = (x: number, debut: number, fin: number) =>
  (x - debut) * (x - fin) <= 0;

export class CollectionInformationsEtapes extends Array<InformationsEtape> {
  estAvantDerniereEtape(numeroEtape: number) {
    return numeroEtape >= this.length - 2;
  }

  recupereInformationsEtapeSuivante(numeroEtapeCourante: number) {
    return this[numeroEtapeCourante + 1] || "";
  }

  siExiste(numeroEtape: number, action: (val: number) => void) {
    if (dansIntervale(numeroEtape, 0, this.length - 1)) {
      action(numeroEtape);
    }
  }

  recupereEtapeCourante<T extends InformationsEtape>(
    numeroEtape: number,
    // donneesFormulaire: DonneesFormulaireSimulateur,
  ): T {
    return this[numeroEtape] as T;
  }

  numeroCourante(numeroEtapeCourante: number) {
    return numeroEtapeCourante + 1;
  }

  recupereElement(
    numeroEtapeCourante: number,
    inputsState: DonneesFormulaireSimulateur,
  ) {
    const informationsEtape = this[numeroEtapeCourante];
    if (
      numeroEtapeCourante === 3 &&
      inputsState.secteurActivite.includes("energie")
    ) {
      return (informationsEtape as InformationEtapeForm).sousEtapeConditionnelle
        ?.sousEtape;
    }
    return informationsEtape.elementToRender;
  }
}
