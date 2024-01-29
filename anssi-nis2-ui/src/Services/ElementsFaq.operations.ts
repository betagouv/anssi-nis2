import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { flow } from "fp-ts/lib/function";
import { prop } from "../../../commun/utils/services/objects.operations.ts";
import {
  fabriqueItemSectionBranche,
  fabriqueItemSectionFeuille,
} from "./ElementsFaq.fabriques.ts";
import {
  ExtractionSection,
  InformationsSection,
  NiveauTitre,
} from "./Markdown/Markdown.declarations.ts";

const extraitSousTitresPourNiveau = (
  niveau: NiveauTitre,
  listeSections: InformationsSection[],
): InformationsSection[] => {
  if (listeSections.length === 0) return [];
  if (listeSections[0].niveau <= niveau) return [];
  return [
    listeSections[0],
    ...extraitSousTitresPourNiveau(niveau, listeSections.slice(1)),
  ];
};

const estInformationSection = (
  section: ExtractionSection | InformationsSection,
): section is InformationsSection =>
  Object.keys(section).includes("titreCourt");

const transformeExtractionEnInformationSection = (
  section: ExtractionSection | InformationsSection,
): InformationsSection =>
  estInformationSection(section)
    ? section
    : {
        ...section,
        titreCourt: section.titre,
      };

export const imbriqueInformationsSectionsParNiveau = (
  listeSections: readonly InformationsSection[],
  niveauSection: NiveauTitre = 1,
): SideMenuProps.Item[] => {
  if (listeSections.length === 0) return [];
  const sousListe = extraitSousTitresPourNiveau(
    niveauSection,
    listeSections.slice(1),
  );
  const suite = listeSections.slice(sousListe.length + 1);

  return [
    sousListe.length === 0
      ? fabriqueItemSectionFeuille(listeSections[0])
      : fabriqueItemSectionBranche(
          listeSections[0],
          sousListe.map(fabriqueItemSectionFeuille),
        ),
    ...imbriqueInformationsSectionsParNiveau(suite, niveauSection),
  ];
};

export const imbriqueSectionsParNiveau =
  (niveauSection: NiveauTitre = 1) =>
  (
    listeSections: readonly (ExtractionSection | InformationsSection)[],
  ): SideMenuProps.Item[] =>
    imbriqueInformationsSectionsParNiveau(
      listeSections.map(transformeExtractionEnInformationSection),
      niveauSection,
    );

/**
 * Transforme l'extraction des FrontMatters de Markdown par titre de sections
 * en items pour un menu
 */
export const transformeFrontMatterVersSideMenuPropItems = flow(
  prop("sections"),
  imbriqueSectionsParNiveau(1),
);
