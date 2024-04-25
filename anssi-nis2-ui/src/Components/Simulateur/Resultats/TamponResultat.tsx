import { ReactElement } from "react";
import {
  RegulationEntite,
  ResultatEligibilite,
  TypeEntite,
} from "../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { IconeResultat } from "./IconeResultat.tsx";

export function TamponResultat({
  resultat,
}: {
  resultat: ResultatEligibilite;
}) {
  return (
    <div
      className={`fr-px-4w fr-pt-3w fr-pb-4w fr-nis2-resultat ${
        classesCss[resultat.regulation]
      }`}
    >
      <IconeResultat classIcone={icones[resultat.regulation]} />
      <h4>{titres[resultat.regulation][resultat.typeEntite]}</h4>
      <p>{sousTitre[resultat.regulation]}</p>
    </div>
  );
}

const classesCss: Record<RegulationEntite, string> = {
  Regule: "fr-nis2-eligible",
  NonRegule: "fr-nis2-non-eligible",
  Incertain: "fr-nis2-incertain-UE",
};

const icones: Record<RegulationEntite, string> = {
  Regule: "fr-icon-check-line",
  NonRegule: "fr-icon-close-line",
  Incertain: "fr-icon-question-fill",
};

const titres: Record<RegulationEntite, Record<TypeEntite, ReactElement>> = {
  Regule: {
    EntiteEssentielle: (
      <>
        Votre entité sera régulée par NIS 2<br />
        en tant qu&apos;Entité Essentielle (EE)
      </>
    ),
    EntiteImportante: (
      <>
        Votre entité sera régulée par NIS 2<br />
        en tant qu&apos;Entité Importante (EI)
      </>
    ),
    EnregistrementUniquement: (
      <>
        Votre entité sera régulée par NIS 2<br />
        avec pour seule nécessité de s&apos;enregistrer
      </>
    ),
    AutreEtatMembreUE: <>Votre entité sera régulée par NIS 2</>,
  },
  NonRegule: {
    EntiteEssentielle: <>Votre entité ne sera pas régulée par NIS 2</>,
    EntiteImportante: <>Votre entité ne sera pas régulée par NIS 2</>,
    EnregistrementUniquement: <>Votre entité ne sera pas régulée par NIS 2</>,
    AutreEtatMembreUE: <>Votre entité ne sera pas régulée par NIS 2</>,
  },
  Incertain: {
    EntiteEssentielle: (
      <>
        Votre entité relève de la compétence <br /> d&apos;un autre État membre
        vis-à-vis de NIS 2
      </>
    ),
    EntiteImportante: (
      <>
        Votre entité relève de la compétence <br /> d&apos;un autre État membre
        vis-à-vis de NIS 2
      </>
    ),
    EnregistrementUniquement: (
      <>
        Votre entité relève de la compétence
        <br />
        d&apos;un autre État membre vis-à-vis de NIS 2
      </>
    ),
    AutreEtatMembreUE: (
      <>
        Votre entité relève de la compétence
        <br />
        d&apos;un autre État membre vis-à-vis de NIS 2
      </>
    ),
  },
};

const indicatifEtChangeant = (
  <>
    Ce résultat se base sur les éléments saisis et est{" "}
    <u>strictement indicatif</u> et <u>susceptible d&apos;évoluer</u> dans le
    cadre de l&apos;adoption prochaine des textes législatifs et réglementaires
    de transposition de la directive NIS 2.
  </>
);

const indicatifSeulement = (
  <>
    Ce résultat se base sur les éléments saisis et est{" "}
    <u>strictement indicatif</u>.
  </>
);

const sousTitre: Record<RegulationEntite, ReactElement> = {
  Regule: indicatifEtChangeant,
  NonRegule: indicatifEtChangeant,
  Incertain: indicatifSeulement,
};
