import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import {
  lienDirectiveEuropeenne,
  lienFaqAnssi,
} from "../../../References/liens.tsx";

import { TuileLien } from "../../General/TuileLien.tsx";
import imageSourceUE from "../../../assets/source_EU.svg";
import imageWebinaire from "../../../assets/webinar.svg";
import imageFAQ from "../../../assets/faq.svg";

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
            image={imageSourceUE}
            titre={"Directive"}
            lien={lienDirectiveEuropeenne}
          />{" "}
          <TuileLien
            image={imageWebinaire}
            titre={"Webinaire"}
            lien={lienFaqAnssi}
          />
          <TuileLien image={imageFAQ} titre={"FAQ"} lien={lienFaqAnssi} />
        </ul>
      </CenteredContainer>
    </RowContainer>
  );
};
