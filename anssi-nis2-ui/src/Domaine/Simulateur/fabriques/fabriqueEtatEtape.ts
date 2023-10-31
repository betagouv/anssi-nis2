import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../DonneesFormulaire.ts";
import {
  ConstantesEtatEtape,
  EtatEtapes,
} from "../../../Services/Simulateur/EtatEtapes.ts";
import { InformationEtapeForm } from "../../../Services/Simulateur/InformationsEtape.ts";
import { CollectionInformationsEtapes } from "../../../Services/Simulateur/CollectionInformationsEtapes.ts";

type FabriqueEtatEtape = (
  collectionEtapes: CollectionInformationsEtapes,
  indiceEtape: number,
  indiceSousEtape?: number,
  donneesFormulaire?: DonneesFormulaireSimulateur,
) => EtatEtapes;

export const fabriqueEtatEtape: FabriqueEtatEtape = (
  collectionEtapes,
  indiceEtape,
  indiceSousEtape = 0,
  donneesFormulaire = donneesFormulaireSimulateurVide,
) => {
  const estSurSousEtape =
    indiceSousEtape != ConstantesEtatEtape.indiceSousEtapeInitial;
  const etapeCourantePrincipale =
    collectionEtapes.recupereEtapeCourante(indiceEtape);
  const contenuEtapeCourante = estSurSousEtape
    ? collectionEtapes.recupereSousEtape(indiceEtape) || etapeCourantePrincipale
    : etapeCourantePrincipale;
  const informationEtapeForm = contenuEtapeCourante as InformationEtapeForm;
  const remplitContitionSousEtape = (donnees: DonneesFormulaireSimulateur) =>
    informationEtapeForm.remplitContitionSousEtape(donnees);
  const etapeSuivantExiste = indiceEtape < collectionEtapes.length - 1;
  const ignoreEtape = etapeSuivantExiste
    ? (suivant: EtatEtapes, donnees: DonneesFormulaireSimulateur) => {
        return suivant.informationEtapeForm.options.ignoreSi(donnees);
      }
    : () => false;
  const estSurEtapeInitiale =
    indiceEtape === ConstantesEtatEtape.indiceEtapeInitial;
  return {
    donneesFormulaire: donneesFormulaire,
    collectionEtapes: collectionEtapes,
    titre: contenuEtapeCourante.titre,
    indice: indiceEtape,
    indiceCourant: indiceEtape,
    indiceSousEtape: indiceSousEtape,
    numero: collectionEtapes.numeroCourant(indiceEtape),
    contenuEtapeCourante: contenuEtapeCourante,
    conteneurElement: informationEtapeForm.conteneurElementRendu,
    etapeSuivantExiste: etapeSuivantExiste,
    estSurSousEtape: estSurSousEtape,
    estSurEtapeInitiale: estSurEtapeInitiale,
    informationEtapeForm: informationEtapeForm,
    ignoreEtapeSuivante: ignoreEtape,
    remplitContitionSousEtape: remplitContitionSousEtape,
  };
};
