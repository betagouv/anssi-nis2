import { RowContainer } from "../../General/RowContainer.tsx";
import { CenteredContainer } from "../../General/CenteredContainer.tsx";
import React, { memo } from "react";
import { DefaultComponentExtensible } from "../../../Services/Props";
import { SimulateurResultatProps } from "../../../Services/Simulateur/Props/simulateurResultatProps";
import { BienDebuterAvecPdf } from "./BienDebuterAvecPdf.tsx";
import { BienDebuterSansPdf } from "./BienDebuterSansPdf.tsx";

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
          {contenuResultat.afficheBlocs.bienDebuterAvecPdf && (
            <BienDebuterAvecPdf />
          )}
          {!contenuResultat.afficheBlocs.bienDebuterAvecPdf && (
            <BienDebuterSansPdf />
          )}
        </CenteredContainer>
      </RowContainer>
    );
  });

export const LigneBienDebuter = React.memo(LigneBienDebuterCalculee);
