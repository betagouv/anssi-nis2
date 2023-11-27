import { PdfCardContainer } from "../../General/PdfCardContainer.tsx";
import PdfCard from "../../General/PdfCard.tsx";

export const BienDebuterAvecPdf = () => (
  <>
    <p className="fr-mt-5w">
      Dans l’attente des exigences françaises pour votre organisation, retrouvez
      les guides essentiels de bonne pratique de l’ANSSI pour débuter dès à
      présent votre montée en maturité cyber.
    </p>
    <PdfCardContainer>
      <PdfCard
        imageUrl="images/GuideTPE-PME.png"
        imageAlt="La cyberécurité pour les TPE/PME en 13 questions"
        title="Guide des TPE/PME"
        linkProps={{
          href: "https://www.ssi.gouv.fr/uploads/2021/02/anssi-guide-tpe_pme.pdf",
          target: "_blank",
        }}
      />
      <PdfCard
        imageAlt="Guide d'Hygiène Informatique - Renforcer la sécurité de son système en 42 mesures"
        imageUrl="images/GuideHygieneCyber.png"
        linkProps={{
          href: "https://www.ssi.gouv.fr/uploads/2017/01/guide_hygiene_informatique_anssi.pdf",
          target: "_blank",
        }}
        title="Guide d’hygiène cyber"
      />
    </PdfCardContainer>
    <p className="fr-mt-5w">
      Retrouvez sur le site de l’ANSSI l’ensemble des guides de bonnes pratiques
      ainsi que les mesures cyber préventives prioritaires.
    </p>
  </>
);
