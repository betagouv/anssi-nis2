import { DefaultComponent } from "../../Services/Props";
import { UppercaseH2 } from "../Styled/UppercaseH2.tsx";
import {
  lienDirectiveEuropeenne,
  lienFaqAnssi,
} from "../../References/liens.tsx";
import { TuileLien } from "../General/TuileLien.tsx";
import imageSourceUE from "../../assets/source_EU.svg";
import imageWebinaire from "../../assets/webinar.svg";
import imageFAQ from "../../assets/faq.svg";

const BandeauEnSavoirPlus: DefaultComponent = () => {
  return (
    <>
      <div className="fr-container fr-nis2-bordure-bas-l">
        <div className="fr-px-13w fr-py-7w">
          <UppercaseH2 className="fr-h1 fr-mb-5w">En savoir plus</UppercaseH2>
          <p className="fr-nis2-text--center fr-mb-5w">
            Retrouver ci-dessous les éléments de contexte pour comprendre plus
            en détail les enjeux et modalités de la directives.
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
        </div>
      </div>
    </>
  );
};

export default BandeauEnSavoirPlus;
