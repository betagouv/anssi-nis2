import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { flow } from "fp-ts/lib/function";
import { VVVPipe } from "../../../commun/core/src/Domain/utilitaires/debug.ts";
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
  items: sections,
  text: titreCourt,
});

const fabriqueSectionCourante = (section: Partial<SectionsImbriquees>) =>
  section["sections"]?.length
    ? fabriqueItemSectionBranche(section as SectionsImbriquees)
    : fabriqueItemSectionFeuille(section as InformationsSection);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const construitItemSection = (
  sections: SideMenuProps.Item[],
  section: InformationsSection | SectionsImbriquees,
) => [...sections, fabriqueSectionCourante(section)];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  return [
    {
      ...fabriqueItemSectionBranche(listeSections[0] as SectionsImbriquees),
      items: sousListe.map(
        flow(VVVPipe("Avant"), fabriqueItemSectionFeuille, VVVPipe("Après")),
      ),
    },
    ...imbriqueInformationsSectionsParNiveau(suite, niveauSection),
  ];
};

export const imbriqueSectionsParNiveau =
  (niveauSection: NiveauTitre = 1) =>
  (
    listeSections: readonly (ExtractionSection | InformationsSection)[],
  ): SideMenuProps.Item[] => {
    return imbriqueInformationsSectionsParNiveau(
      VVVPipe<readonly InformationsSection[]>("imbriqueSectionsParNiveau")(
        listeSections.map(transformeExtractionEnInformationSection),
      ),
      niveauSection,
    );
  };

/**
 * Transforme l'extraction des FrontMatters de Markdown par titre de sections
 * en items pour un menu
 */
export const transformeFrontMatterVersSideMenuPropItems = flow(
  prop("sections"),
  imbriqueSectionsParNiveau(1),
);
