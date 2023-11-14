import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import React, { memo } from "react";
import { DefaultComponentExtensible } from "../../../Services/Props";
import { SimulateurResultatProps } from "../../../Services/Simulateur/Props/simulateurResultatProps";
import { BienDebuterAvecPdf } from "./BienDebuterAvecPdf.tsx";
import { BienDebuterSansPdf } from "./BienDebuterSansPdf.tsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { liens } from "../../../References/liens.tsx";

const LigneBienDebuterCalculee: DefaultComponentExtensible<SimulateurResultatProps> =
  memo(function LigneBienDebuterCalculee({
    contenuResultat,
  }: SimulateurResultatProps) {
    return (
      <RowContainer>
        <CenteredContainer>
          <h2 className="fr-text-action-high--blue-france fr-h1">
            Pour bien débuter
          </h2>
          {(contenuResultat.afficheBlocs.bienDebuterAvecPdf && (
            <BienDebuterAvecPdf />
          )) || <BienDebuterSansPdf />}

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
