import { PdfCardContainer } from "../../General/PdfCardContainer.tsx";
import PdfCard from "../../General/PdfCard.tsx";
import ImageGuideTPEPME from "../../../assets/GuideTPE-PME.png";
import ImageGuideHygieneCyber from "../../../assets/GuideHygieneCyber.png";

export const BienDebuterAvecPdf = () => (
  <>
    <p className="fr-text">
      Dans l’attente des exigences françaises pour votre organisation, retrouvez
      les guides essentiels de bonne pratique de l’ANSSI pour débuter dès à
      présent votre montée en maturité cyber.
    </p>
    <PdfCardContainer>
      <PdfCard
        imageUrl={ImageGuideTPEPME}
        imageAlt="La cyberécurité pour les TPE/PME en 13 questions"
        title="Guide des TPE/PME"
        linkProps={{
          href: "https://www.ssi.gouv.fr/uploads/2021/02/anssi-guide-tpe_pme.pdf",
          target: "_blank",
        }}
      />
      <PdfCard
        imageAlt="Guide d'Hygiène Informatique - Renforcer la sécurité de son système en 42 mesures"
        imageUrl={ImageGuideHygieneCyber}
        linkProps={{
          href: "https://www.ssi.gouv.fr/uploads/2017/01/guide_hygiene_informatique_anssi.pdf",
          target: "_blank",
        }}
        title="Guide d’hygiène cyber"
      />
    </PdfCardContainer>
    <p>
      Retrouvez sur le site de l’ANSSI l’ensemble des guides de bonnes pratiques
      ainsi que les mesures cyber préventives prioritaires.
    </p>
  </>
);
