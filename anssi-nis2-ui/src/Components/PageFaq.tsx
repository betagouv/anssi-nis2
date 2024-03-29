import { SideMenu } from "@codegouvfr/react-dsfr/SideMenu";
import { chargeContenuMarkdown } from "../Services/depots/ChargeContenuMarkdown.depot.ts";
import { activeElementsAvecUrl } from "../Services/ElementsFaq.operations.ts";
import { contenuFaqParDefaut } from "../Services/fabriques/ContenuFaq.constantes.ts";
import { fabriqueContenuFaq } from "../Services/fabriques/ContenuFaq.fabrique.ts";
import { DefaultComponentExtensible, DefaultProps } from "../Services/Props";
import MiseEnPage from "./MiseEnPage.tsx";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import remarkFrontmatter from "remark-frontmatter";
import rehypeSlug from "rehype-slug";
import { PluggableList } from "unified";

export const PageFaq: DefaultComponentExtensible<DefaultProps> = () => {
  const [contenuFaq, setContenuFaq] = useState(contenuFaqParDefaut);
  const location = useLocation();

  useEffect(() => {
    chargeContenuMarkdown("FAQ", fabriqueContenuFaq, contenuFaqParDefaut)
      .then(activeElementsAvecUrl)
      .then(setContenuFaq);
  }, [location]);

  const remarkPlugins: PluggableList = [
    [remarkFrontmatter, { marker: "-", type: "yaml", anywhere: true }],
  ];
  return (
    <MiseEnPage page="FAQ NIS2">
      <div className="fr-container fr-mt-4w">
        <div className="fr-grid-row">
          <SideMenu
            align="left"
            burgerMenuButtonText="Dans cette rubrique"
            items={contenuFaq.chapitres}
            title="Sommaire"
            className="fr-col-3 fr-sidemenu--sticky-full-height fr-nis2-faq-menu"
          />
          <div className="fr-col-offset-1 fr-col-7 fr-py-4w fr-nis2-faq">
            <Markdown
              remarkPlugins={remarkPlugins}
              rehypePlugins={[rehypeSlug]}
            >
              {contenuFaq.contenu}
            </Markdown>
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
