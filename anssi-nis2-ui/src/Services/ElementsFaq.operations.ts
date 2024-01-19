import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { construitAncre } from "../../../commun/utils/services/string.operations.ts";
import {
  InformationsSection,
  NiveauTitre,
  SectionsImbriquees,
} from "./Markdown/Markdown.declarations.ts";
import { flow } from "fp-ts/lib/function";
import { reduce } from "fp-ts/lib/ReadonlyArray";

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
    imbriqueSectionsParNiveau,
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
  niveauSection: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
) =>
  sousListe.length > 0
    ? {
        ...section,
        sections: imbriqueSectionsParNiveau(
          sousListe,
          incrementeNiveauTitre(niveauSection),
        ),
      }
    : section;

export const imbriqueSectionsParNiveau = (
  listeSections: readonly InformationsSection[],
  niveauSection: NiveauTitre = 1,
): (SectionsImbriquees | InformationsSection)[] => {
  if (listeSections.length === 0) return [];
  const section = listeSections[0];
  const [sousListe, suite] = sousListePourNiveau(1, listeSections.slice(1));
  return [
    fabriqueSection(section, sousListe, niveauSection),
    ...imbriqueSectionsParNiveau(suite, niveauSection),
  ];
};

const prop =
  <TypeRetour = unknown, P extends string | number | symbol = string>(p: P) =>
  <T extends { [s in P]: T[s] }>(o: T): TypeRetour =>
    o[p];
export const transformeFrontMatterVersSideMenuPropItems = flow(
  prop<Readonly<InformationsSection[]>>("sections"),
  imbriqueSectionsParNiveau,
  reduce([], construitItemSection),
);
