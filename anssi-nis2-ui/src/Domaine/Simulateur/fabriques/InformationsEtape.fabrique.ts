import {
  CapaciteEtape,
  EtapePrealable,
  InformationEtapeForm,
  EtapeResultat,
  InformationsEtape,
  OptionsInformationEtapeForm,
  SousEtapeConditionnelle,
} from "../../../Services/Simulateur/InformationsEtape.ts";
import { PredicatDonneesSimulateur } from "../../../Services/Simulateur/PredicatDonneesSimulateur.ts";
import { SimulateurEtapeNodeComponent } from "../../../Services/Simulateur/Props/component";
import { ValidationReponses } from "../operations/validateursChamps";
import { elementVide } from "../../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import { SimulateurEtapeForm } from "../../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.ts";
import { SimulateurEtapePrealable } from "../../../Components/Simulateur/SimulateurEtapePrealable.tsx";

const fabriqueInformationsEtapeResultat: (titre: string) => EtapeResultat = (
  titre: string,
) => ({
  titre: titre,
  estComptabilisee: false,
  existe: true,
  conteneurElementRendu: SimulateurEtapeForm,
  remplitContitionSousEtape: () => false,
});

const fabriqueInformationsEtapeForm = (
  titre: string,
  validationReponses: ValidationReponses,
  composant: SimulateurEtapeNodeComponent,
  options: Partial<OptionsInformationEtapeForm> = optionsInformationEtapeFormParDefaut,
) => ({
  titre: titre,
  validationReponses: validationReponses,
  composant: composant,
  options: {
    ...optionsInformationEtapeFormParDefaut,
    ...options,
  },
  estComptabilisee: true,
  existe: true,
  conteneurElementRendu: SimulateurEtapeForm,
  remplitContitionSousEtape: (donnees: DonneesFormulaireSimulateur) =>
    options.sousEtapeConditionnelle?.condition(donnees) || false,
});

const fabriqueInformationEtapePrealable: (titre: string) => EtapePrealable = (
  titre: string,
) => ({
  existe: true,
  estComptabilisee: false,
  conteneurElementRendu: SimulateurEtapePrealable,
  titre: titre,
  remplitContitionSousEtape(): boolean {
    return false;
  },
});

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
export const EtapeInexistante: InformationsEtape & CapaciteEtape = {
  estComptabilisee: false,
  existe: false,
  titre: "Hors de portee",
  conteneurElementRendu: elementVide,
  remplitContitionSousEtape: () => false,
} as const;

export const optionsInformationEtapeFormParDefaut: OptionsInformationEtapeForm =
  {
    ignoreSi: () => false,
    sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle(
      () => false,
      EtapeInexistante as InformationEtapeForm,
    ),
  };
