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

export const activeElement = (
  element: SideMenuProps.Item,
): SideMenuProps.Item => Object.assign({}, element, { isActive: true });

const estElementFeuille = (
  e: SideMenuProps.Item,
): e is SideMenuProps.Item.Link => e.linkProps !== undefined;

const estElementBranche = (
  e: SideMenuProps.Item,
): e is SideMenuProps.Item.SubMenu => "items" in e && e?.items !== undefined;

const estElementAvecAncre =
  (ancre: string) =>
  (e: SideMenuProps.Item): e is SideMenuProps.Item.Link =>
    (e as SideMenuProps.Item.Link).linkProps?.href === ancre;
const propageActivation =
  (ancre: string) =>
  (e: SideMenuProps.Item): SideMenuProps.Item =>
    estElementBranche(e)
      ? {
          ...e,
          items: activeBrancheAvecAncre(e.items)(ancre),
        }
      : e;

const activeBrancheSiNecessaire = (e: SideMenuProps.Item) =>
  estElementBranche(e) && e.items.some((e) => e.isActive)
    ? activeElement(e)
    : e;

const activeElementAvecAncre = (ancre: string) => (e: SideMenuProps.Item) =>
  estElementFeuille(e)
    ? estElementAvecAncre(ancre)(e)
      ? activeElement(e)
      : e
    : activeBrancheSiNecessaire(propageActivation(ancre)(e));

export const activeBrancheAvecAncre =
  (listeElements: SideMenuProps.Item[]) => (ancre: string) =>
    listeElements.map(activeElementAvecAncre(ancre));
