import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { flow } from "fp-ts/lib/function";
import { reduce } from "fp-ts/lib/ReadonlyArray";
import { prop } from "../../../commun/utils/services/objects.operations.ts";
import { construitAncre } from "../../../commun/utils/services/string.operations.ts";
import {
  ExtractionSection,
  InformationsSection,
  NiveauTitre,
  SectionsImbriquees,
} from "./Markdown/Markdown.declarations.ts";

const fabriqueItemSectionFeuille = ({
  titreCourt,
}: InformationsSection): SideMenuProps.Item => ({
  expandedByDefault: true,
  isActive: true,
  linkProps: { href: construitAncre(`${titreCourt}`) },
  text: titreCourt,
});
const fabriqueItemSectionBranche = ({
  titreCourt,
  sections,
}: SectionsImbriquees): SideMenuProps.Item => ({
  expandedByDefault: true,
  isActive: true,
  items: flow(
    imbriqueSectionsParNiveauSure,
    reduce([], construitItemSection),
  )(sections),
  text: titreCourt,
});

const fabriqueSectionCourante = (section: Partial<SectionsImbriquees>) =>
  section["sections"]
    ? fabriqueItemSectionBranche(section as SectionsImbriquees)
    : fabriqueItemSectionFeuille(section as InformationsSection);

const construitItemSection = (
  sections: SideMenuProps.Item[],
  section: InformationsSection | SectionsImbriquees,
) => [...sections, fabriqueSectionCourante(section)];

const incrementeNiveauTitre = (niveau: NiveauTitre): NiveauTitre =>
  niveau < 8 ? ((niveau + 1) as NiveauTitre) : niveau;

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

const fabriqueSection = (
  section: InformationsSection,
  sousListe: (SectionsImbriquees | InformationsSection)[],
  niveauSection: NiveauTitre,
) =>
  sousListe.length > 0
    ? {
        ...section,
        sections: imbriqueSectionsParNiveauSure(
          sousListe,
          incrementeNiveauTitre(niveauSection),
        ),
      }
    : section;

export const imbriqueSectionsParNiveauSure = (
  listeSections: readonly InformationsSection[],
  niveauSection: NiveauTitre = 1,
): (SectionsImbriquees | InformationsSection)[] => {
  if (listeSections.length === 0) return [];
  const [sousListe, suite] = sousListePourNiveau(1, listeSections.slice(1));
  return [
    fabriqueSection(listeSections[0], sousListe, niveauSection),
    ...imbriqueSectionsParNiveauSure(suite, niveauSection),
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
    : ({
        ...section,
        titreCourt: section.titre,
      } as InformationsSection);
export const imbriqueSectionsParNiveau = (
  listeSections: readonly (ExtractionSection | InformationsSection)[],
  niveauSection: NiveauTitre = 1,
): (SectionsImbriquees | InformationsSection)[] =>
  imbriqueSectionsParNiveauSure(
    listeSections.map(transformeExtractionEnInformationSection),
    niveauSection,
  );

export const transformeFrontMatterVersSideMenuPropItems = flow(
  prop("sections"),
  imbriqueSectionsParNiveau,
  reduce([], construitItemSection),
);
