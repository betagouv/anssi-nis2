import { DefaultComponent } from "../../Services/Props";
import { liens } from "../../References/liens.tsx";
import { TuileLien } from "../General/TuileLien.tsx";
import imageSourceUE from "../../assets/source_EU.svg";
import imageWebinaire from "../../assets/webinar.svg";
import imageFAQ from "../../assets/faq.svg";

const BandeauEnSavoirPlus: DefaultComponent = () => {
  return (
    <>
      <div className="fr-container fr-nis2-bandeau-marianne-leger fr-nis2-bordure-bas-l">
        <div className="fr-py-7w">
          <h2 className="fr-h1 fr-mb-5w">En savoir plus</h2>
          <div className="fr-grid-row--center">
            <div className="fr-col-8 fr-col-offset-2 ">
              <p className="fr-text--lead fr-mb-5w">
                Retrouver ci-dessous les éléments de contexte pour comprendre
                plus en détail les enjeux et modalités de la directive.
              </p>
              <ul className="fr-nis2-tuile-lien fr-grid-row">
                <TuileLien
                  image={imageSourceUE}
                  titre={"Directive NIS 2"}
                  lien={liens.legislation.europa}
                />
                <TuileLien
                  image={imageWebinaire}
                  titre={"Présentation vidéo"}
                  lien={liens.anssi.webinaire}
                />
                <TuileLien
                  image={imageFAQ}
                  titre={"FAQ"}
                  lien={liens.anssi.faq}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BandeauEnSavoirPlus;
