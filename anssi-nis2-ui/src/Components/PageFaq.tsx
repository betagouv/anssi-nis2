import { SideMenu, SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { chargeContenuMarkdown } from "../Services/depots/ChargeContenuMarkdown.depot.ts";
import { contenuFaqParDefaut } from "../Services/fabriques/ContenuFaq.constantes.ts";
import { fabriqueContenuFaq } from "../Services/fabriques/ContenuFaq.fabrique.ts";
import { DefaultComponentExtensible, DefaultProps } from "../Services/Props";
import MiseEnPage from "./MiseEnPage.tsx";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";

export const PageFaq: DefaultComponentExtensible<DefaultProps> = () => {
  const elementsPerimetreEntitesConcernees = [
    {
      linkProps: {
        href: "#faq-5",
      },
      text: "5. Comment savoir si je suis concerné ?",
    },
    {
      linkProps: {
        href: "#faq-6",
      },
      text: "6. Quelle mise en œuvre et pilotage en Outre-mer ?",
    },
    {
      linkProps: {
        href: "#faq-7",
      },
      text: "7. Serais-je concerné par NIS 2 en tant que collectivité territoriale ?",
    },
    {
      isActive: true,
      linkProps: {
        href: "#faq-8",
      },
      text: "8. Suis-je assujetti à la transposition française si sur deux États membres ?",
    },
    {
      linkProps: {
        href: "#faq-9",
      },
      text: "9. Quelles actions pour faciliter la mise en relation avec l’ANSSI ?",
    },
    {
      linkProps: {
        href: "#faq-10",
      },
      text: "10. Quelle gestion des exceptions ?",
    },
    {
      linkProps: {
        href: "#faq-11",
      },
      text: "11. Qui sera concerné ?",
    },
    {
      linkProps: {
        href: "#faq-12",
      },
      text: "12. Qu’en est-il des acteurs tiers ?",
    },
  ];
  const elementsMenuFaq: SideMenuProps.Item[] = [
    {
      text: "Introduction",
      linkProps: { href: "#" },
    },
    {
      expandedByDefault: true,
      isActive: true,
      items: elementsPerimetreEntitesConcernees,
      text: "Périmètre des entités concernées",
    },
    {
      items: [],
      text: "Obligations",
    },
    {
      items: [],
      text: "Organisation de la transposition nationale",
    },
    {
      items: [],
      text: "Régulation",
    },
    {
      items: [],
      text: "Accompagnement",
    },
    {
      items: [],
      text: "Organisation ANSSI",
    },
    {
      items: [],
      text: "Articulation avec les autres réglementations",
    },
  ];
  const [contenuFaq, setContenuFaq] = useState(contenuFaqParDefaut);
  useEffect(() => {
    chargeContenuMarkdown("FAQ", fabriqueContenuFaq, contenuFaqParDefaut).then(
      setContenuFaq,
    );
  }, []);

  return (
    <MiseEnPage page="FAQ NIS2">
      <div className="fr-container fr-mt-4w">
        <div className="fr-grid-row">
          <SideMenu
            align="left"
            burgerMenuButtonText="Dans cette rubrique"
            items={elementsMenuFaq}
            title="Sommaire"
            className="fr-col-3 fr-sidemenu--sticky-full-height"
          />
          <div className="fr-col-offset-1 fr-col-7 fr-pt-4w fr-nis2-faq">
            <Markdown>{contenuFaq.contenu}</Markdown>
            <div>
              <a href="#top">
                <i className="fr-fi-arrow-up-s-line" />
                Haut de page
              </a>
            </div>
          </div>
        </div>
      </div>
    </MiseEnPage>
  );
};
