import { RowContainer } from "../../RowContainer.tsx";
import { CenteredContainer } from "../../CenteredContainer.tsx";
import { PdfCardContainer } from "../../PdfCardContainer.tsx";
import PdfCard from "../../PdfCard.tsx";
import ImageGuideTPEPME from "../../../assets/GuideTPE-PME.png";
import ImageGuideHygieneCyber from "../../../assets/GuideHygieneCyber.png";
import React from "react";

export const LigneBienDebuter = React.memo(LigneBienDebuterCalculee);

function LigneBienDebuterCalculee() {
  return (
    <RowContainer>
      <CenteredContainer>
        <h2 className="fr-text-action-high--blue-france fr-h1">
          Pour bien débuter
        </h2>
        <p className="fr-text">
          Dans l’attente des exigences françaises pour votre organisation,
          retrouvez les guides essentiels de bonne pratique de l’ANSSI pour
          débuter dès à présent votre montée en maturité cyber.
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
      </CenteredContainer>
    </RowContainer>
  );
}
