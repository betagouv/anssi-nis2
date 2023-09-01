import React from 'react'
import { Props } from "../../Props.ts";
import { fr } from "@codegouvfr/react-dsfr";

import { ColorTheme, useColors } from "@codegouvfr/react-dsfr/useColors";
import { createMakeAndWithStyles } from "tss-react";

const { makeStyles } = createMakeAndWithStyles({
  useTheme: function (): ColorTheme {
    return useColors();
  },
});

const useStyles = makeStyles()((theme) => ({
  "cool-illustration": {
    width: "336px",
    height: "364px",
    gap: fr.spacing("1w"),
    borderRadius: fr.spacing("2w"),
    display: "flex",
    color: theme.decisions.text.default.grey.default,
    "& h2": { fontWeight: 500 },
    alignItems: "center",
    textAlign: "center",
    background: "var(--primary-white, #FFF)",
    opacity: 0.3,
    border: "2px dashed #2F3A43",
  },
}));
export const CoolIllustration = (props: Props) => {
  const { className } = props;

  const { classes, cx } = useStyles();

  return (
    <div className="fr-col-4">
      <div className={cx([classes["cool-illustration"], "fr-p-1w"], className)}>
        <h2>Insert cool illustration here</h2>
      </div>
    </div>
  );
};
