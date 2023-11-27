import { EtatEtapes } from "anssi-nis2-domain/src/Simulateur/EtatEtapes.ts";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import {
  fabriqueEtatEtapePrecedent,
  fabriqueEtatEtapeSuivant,
} from "anssi-nis2-domain/src/Simulateur/services/EtatEtape/EtatEtape.operations.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.tsx";
import { EnvoieDonneesFormulaire } from "./Operations/appelsApi";
import { donneesFormulaireSontCompletes } from "anssi-nis2-domain/src/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats.ts";

export const fabriqueGestionSuivant =
  <TypeConteneur, TypeSimulateurEtapeNodeComponent>(
    setEtatEtape: React.Dispatch<
      React.SetStateAction<
        EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent>
      >
    >,
    etatEtapes: EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent>,
    donneesSimulateur: IDonneesBrutesFormulaireSimulateur,
    envoieDonneesFormulaire: EnvoieDonneesFormulaire,
  ) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    if (donneesFormulaireSontCompletes(donneesSimulateur)) {
      envoieDonneesFormulaire(donneesSimulateur).then(() =>
        setEtatEtape(fabriqueEtatEtapeSuivant(etatEtapes, donneesSimulateur)),
      );
    } else {
      setEtatEtape(fabriqueEtatEtapeSuivant(etatEtapes, donneesSimulateur));
    }
  };

export const fabriqueGestionPrecedent = <
  TypeConteneur,
  TypeSimulateurEtapeNodeComponent,
>(
  setEtatEtape: React.Dispatch<
    React.SetStateAction<
      EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent>
    >
  >,
  etatEtapes: EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent>,
  donneesSimulateur: IDonneesBrutesFormulaireSimulateur,
) => {
  if (etatEtapes.collectionEtapes.estPremiereEtape(etatEtapes.indiceCourant))
    return noRefClick;
  return (e: React.MouseEvent) => {
    e.preventDefault();
    setEtatEtape(fabriqueEtatEtapePrecedent(etatEtapes, donneesSimulateur));
  };
};

export const fabriqueInformationsBoutonsNavigation = <
  TypeConteneur,
  TypeSimulateurEtapeNodeComponent,
>(
  setEtatEtape: React.Dispatch<
    React.SetStateAction<
      EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent>
    >
  >,
  etatEtapes: EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent>,
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
  envoieDonneesFormulaire: EnvoieDonneesFormulaire,
) => ({
  suivant: fabriqueGestionSuivant(
    setEtatEtape,
    etatEtapes,
    donneesFormulaireSimulateur,
    envoieDonneesFormulaire,
  ),
  precedent: fabriqueGestionPrecedent(
    setEtatEtape,
    etatEtapes,
    donneesFormulaireSimulateur,
  ),
});
