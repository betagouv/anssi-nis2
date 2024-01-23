import { SideMenu } from "@codegouvfr/react-dsfr/SideMenu";
import { chargeContenuMarkdown } from "../Services/depots/ChargeContenuMarkdown.depot.ts";
import { contenuFaqParDefaut } from "../Services/fabriques/ContenuFaq.constantes.ts";
import { fabriqueContenuFaq } from "../Services/fabriques/ContenuFaq.fabrique.ts";
import { DefaultComponentExtensible, DefaultProps } from "../Services/Props";
import MiseEnPage from "./MiseEnPage.tsx";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import remarkFrontmatter from "remark-frontmatter";
import { PluggableList } from "unified";

export const PageFaq: DefaultComponentExtensible<DefaultProps> = () => {
  const [contenuFaq, setContenuFaq] = useState(contenuFaqParDefaut);
  useEffect(() => {
    chargeContenuMarkdown("FAQ", fabriqueContenuFaq, contenuFaqParDefaut).then(
      setContenuFaq,
    );
  }, []);

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
            className="fr-col-3 fr-sidemenu--sticky-full-height"
          />
          <div className="fr-col-offset-1 fr-col-7 fr-pt-4w fr-nis2-faq">
            <Markdown remarkPlugins={remarkPlugins}>
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
