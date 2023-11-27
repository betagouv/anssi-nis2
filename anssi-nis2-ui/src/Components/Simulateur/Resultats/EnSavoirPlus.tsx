import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import { liens } from "../../../References/liens.tsx";

import { TuileLien } from "../../General/TuileLien.tsx";

export const EnSavoirPlus = () => {
  return (
    <RowContainer className="fr-nis2-bordure-bas">
      <CenteredContainer>
        <h2 className="fr-text-action-high--blue-france fr-h1">
          En savoir plus
        </h2>
        <p className="fr-text">
          Retrouver ci-dessous les éléments de contexte pour comprendre plus en
          détail les enjeux et modalités de la directives.
        </p>
        <ul className="fr-nis2-tuile-lien fr-grid-row">
          <TuileLien
            image="images/source_EU.svg"
            titre={"Directive"}
            lien={liens.legislation.europa}
          />
          <TuileLien
            image="images/webinar.svg"
            titre={"Webinaire"}
            lien={liens.anssi.webinaire}
          />
          <TuileLien
            image="images/faq.svg"
            titre={"FAQ"}
            lien={liens.anssi.faq}
          />
        </ul>
      </CenteredContainer>
    </RowContainer>
  );
};
