import {
  EtapePrealable,
  InformationEtapeForm,
  InformationEtapeResultat,
  OptionsInformationEtapeForm,
  optionsInformationEtapeFormParDefaut,
  SousEtapeConditionnelle,
} from "../../../Services/Simulateur/InformationsEtape.ts";
import { PredicatDonneesSimulateur } from "../../../Services/Simulateur/PredicatDonneesSimulateur.ts";
import { SimulateurEtapeNodeComponent } from "../../../Services/Simulateur/Props/component";
import { ValidationReponses } from "../operations/validateursChamps";

const fabriqueInformationsEtapeResultat = (titre: string) =>
  new InformationEtapeResultat(titre);

const fabriqueInformationsEtapeForm = (
  titre: string,
  validationReponses: ValidationReponses,
  composant: SimulateurEtapeNodeComponent,
  options: Partial<OptionsInformationEtapeForm> = optionsInformationEtapeFormParDefaut,
) =>
  new InformationEtapeForm(titre, validationReponses, composant, {
    ...optionsInformationEtapeFormParDefaut,
    ...options,
  });

const fabriqueInformationEtapePrealable = (titre: string) =>
  new EtapePrealable(titre);

export const fabriqueSousEtapeConditionnelle: (
  condition: PredicatDonneesSimulateur,
  sousEtape: InformationEtapeForm,
) => SousEtapeConditionnelle = (condition, sousEtape) => ({
  condition: condition,
  sousEtape: sousEtape,
});

export const fabriqueInformationsEtapes = {
  sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle,
  resultat: fabriqueInformationsEtapeResultat,
  form: fabriqueInformationsEtapeForm,
  prealable: fabriqueInformationEtapePrealable,
};
