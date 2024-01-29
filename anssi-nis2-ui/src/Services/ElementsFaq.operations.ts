import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { flow } from "fp-ts/lib/function";
import { prop } from "../../../commun/utils/services/objects.operations.ts";
import { construitAncre } from "../../../commun/utils/services/string.operations.ts";
import {
  ExtractionSection,
  InformationsSection,
  NiveauTitre,
} from "./Markdown/Markdown.declarations.ts";

const fabriqueItemSectionFeuille = ({
  titre,
  titreCourt,
}: InformationsSection): SideMenuProps.Item => ({
  linkProps: { href: construitAncre(`${titre}`) },
  text: titreCourt,
});
const fabriqueItemSectionBranche = ({
  titreCourt,
}: InformationsSection): SideMenuProps.Item => ({
  items: [],
  text: titreCourt,
});

const sousListePourNiveau = (
  niveau: NiveauTitre,
  listeSections: InformationsSection[],
) => {
  let i = 0;
  const sousListe = [];
  while (i < listeSections.length && listeSections[i].niveau > niveau) {
    sousListe.push(listeSections[i]);
    i++;
  }
  return [sousListe, listeSections.slice(i)];
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
  const [sousListe, suite] = sousListePourNiveau(
    niveauSection,
    listeSections.slice(1),
  );
  if (sousListe.length === 0)
    return [
      fabriqueItemSectionFeuille(listeSections[0]),
      ...imbriqueInformationsSectionsParNiveau(suite, niveauSection),
    ];
  return [
    {
      ...fabriqueItemSectionBranche(listeSections[0]),
      items: sousListe.map(fabriqueItemSectionFeuille),
    },
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
