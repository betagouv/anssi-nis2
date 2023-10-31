import {
  CapaciteEtape,
  EtapePrealable,
  EtapeResultat,
  InformationEtapeForm,
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
import { valideToutesLesReponses } from "../services/Validateurs.ts";
import { SimulateurEtapeResult } from "../../../Components/Simulateur/SimulateurEtapeResult.tsx";

const toujoursFaux = () => false;
const toujoursVrai = () => true;

const fabriqueInformationsEtapeResultat: (titre: string) => EtapeResultat = (
  titre,
) => ({
  titre: titre,
  estComptabilisee: false,
  existe: true,
  conteneurElementRendu: SimulateurEtapeResult,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursFaux,
  validationReponses: valideToutesLesReponses,
});

const fabriqueInformationsEtapeForm = (
  titre: string,
  validationReponses: ValidationReponses,
  composant: SimulateurEtapeNodeComponent,
  options: Partial<OptionsInformationEtapeForm> = optionsInformationEtapeFormParDefaut,
): InformationEtapeForm => {
  const optionsCompletes = {
    ...optionsInformationEtapeFormParDefaut,
    ...options,
  };
  return {
    titre: titre,
    validationReponses: validationReponses,
    composant: composant,
    options: optionsCompletes,
    estComptabilisee: true,
    existe: true,
    conteneurElementRendu: SimulateurEtapeForm,
    remplitContitionSousEtape: (donnees: DonneesFormulaireSimulateur) =>
      options.sousEtapeConditionnelle?.condition(donnees) || false,
    estIgnoree: optionsCompletes.ignoreSi,
  };
};

const fabriqueInformationEtapePrealable: (titre: string) => EtapePrealable = (
  titre: string,
) => ({
  existe: true,
  estComptabilisee: false,
  conteneurElementRendu: SimulateurEtapePrealable,
  titre: titre,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursFaux,
  validationReponses: valideToutesLesReponses,
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
} as const;

export const EtapeInexistante: InformationsEtape & CapaciteEtape = {
  estComptabilisee: false,
  existe: false,
  titre: "Hors de portee",
  conteneurElementRendu: elementVide,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursVrai,
  validationReponses: valideToutesLesReponses,
} as const;

export const optionsInformationEtapeFormParDefaut: OptionsInformationEtapeForm =
  {
    ignoreSi: toujoursFaux,
    sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle(
      toujoursFaux,
      EtapeInexistante as InformationEtapeForm,
    ),
  } as const;
