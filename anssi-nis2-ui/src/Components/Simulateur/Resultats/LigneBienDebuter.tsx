import Button from "@codegouvfr/react-dsfr/Button";
import React, { memo } from "react";
import { liens } from "../../../References/liens.tsx";
import { DefaultComponentExtensible } from "../../../Services/Props";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import { RowContainer } from "../../General/RowContainer.tsx";
import { BienDebuterAvecPdf } from "./BienDebuterAvecPdf.tsx";
import { BienDebuterSansPdf } from "./BienDebuterSansPdf.tsx";
import { LigneBienDebuterProps } from "./LigneBienDebuter.declarations.ts";

const LigneBienDebuterCalculee: DefaultComponentExtensible<LigneBienDebuterProps> =
  memo(function LigneBienDebuterCalculee({ avecPdf }: LigneBienDebuterProps) {
    return (
      <RowContainer>
        <CenteredContainer>
          <h2 className="fr-text-action-high--blue-france fr-h1">
            Pour bien débuter
          </h2>
          {(avecPdf && <BienDebuterAvecPdf />) || <BienDebuterSansPdf />}

          <div className="fr-btns-group fr-btns-group--inline">
            <Button
              priority={"tertiary"}
              linkProps={liens.anssi.guidesBonnesPratiques}
            >
              Tous les guides ANSSI
            </Button>
            <Button
              priority={"tertiary"}
              linkProps={liens.anssi.mesuresPrioritaires}
            >
              Mesures prioritaires
            </Button>
          </div>
        </CenteredContainer>
      </RowContainer>
    );
  });

export const LigneBienDebuter = React.memo(LigneBienDebuterCalculee);
