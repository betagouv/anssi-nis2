import { Props } from "../../Services/Props";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import AnssiLogo from "../../assets/ANSSI-180.svg";

import { ColorTheme, useColors } from "@codegouvfr/react-dsfr/useColors";
import { createMakeAndWithStyles } from "tss-react";

const { makeStyles } = createMakeAndWithStyles({
  useTheme: function (): ColorTheme {
    return useColors();
  },
});
const useStyles = makeStyles()(() => ({
  root: {
    textAlign: "center",
    fontSize: "1.125rem",
    "& h2": {
      textTransform: "uppercase",
      textAlign: "center",
    },
  },
  "mea-faits": {
    backgroundColor: "var(--light-accent-blue-cumulus-925, #DAE6FD)",
    width: "fit-content",
  },
}));

const BandeauQuiEstANSSI = (props: Props) => {
  const { className } = props;

  const { classes, cx } = useStyles();

  return (
    <>
      <div
        className={cx([classes["root"], "fr-pt-10w", "fr-pb-13w"], className)}
      >
        <div className={"fr-container"}>
          <div className="fr-grid-row--center">
            <h2 className="fr-mb-7w">Qui est l’ANSSI ?</h2>
            <img src={AnssiLogo} alt="Logo ANSSI" className="fr-mb-7w" />
            <div className="fr-col-8 fr-col-offset-2 fr-px-2w">
              <p className="fr-text--lead fr-mb-4w">
                L’Agence Nationale de la Sécurité des Systèmes d’Information
                assure la sécurité numérique de l’État, mais{" "}
                <span className="fr-text--bold">
                  elle est aussi chargée d’une mission de conseil et de soutien
                  aux administrations et aux opérateurs d’importance vitale.
                </span>
              </p>
              <Button
                iconId="fr-icon-external-link-line"
                onClick={noRefClick}
                priority={"secondary"}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BandeauQuiEstANSSI;
