import './App.css'

import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css'

import { Button } from "@codegouvfr/react-dsfr/Button";
import { makeStyles } from "tss-react/dsfr";
import { fr } from '@codegouvfr/react-dsfr';
//NOTE: If you get "SyntaxError: Cannot use import statement outside a module" add tss-react here in your next.config.js: https://github.com/garronej/react-dsfr-next-demo/blob/43ecfa03d5416f2446b6867af65c7e3c7e7e41ef/next.config.js#L14 

import EnTete from './Components/EnTete'
import PiedDePage from './Components/PiedDePage'
import FondHabillageAccueil from "./assets/habillage-accueil-01.svg"

type Props = {
  className?: string
};

const useStyles = makeStyles()((theme) => ({
  "block_accueil_nis2": {
    background: "#F3F6FE",
    backgroundImage: `url(${FondHabillageAccueil})`,
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    "& .limiter": {
      width: "calc(1440px - 176px - 158px)",
      margin: "0 auto",
      display: "flex"
    },
    "& > div": {
      paddingTop: fr.spacing("12w"),
      paddingBottom: fr.spacing("8w"),
    }
  },
  "appel_a_action": {
    "& *": {
      marginBottom: 0
    },
    "& h1": {
      color: theme.decisions.text.title.blueFrance.default,
      lineHeight: "120%"
    },
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "754px",

    fontWeight: "500",
    gap: fr.spacing("5w")
  },
  "gros": {
    fontSize: "22px"
  },
  "mea_gratuit": {
    backgroundColor: "var(--light-accent-green-emeraude-950, #C3FAD5)",
    padding: "2px 4px",
    fontWeight: "700",
    fontSize: "18px",
    width: "217px"
  },
  description: {
    width: "509px"
  },
  "cool-illustration": {
    color: theme.decisions.text.default.grey.default,
    fontSize: "32px",
    lineHeight: "125%",
    textAlign: "center",
    fontWeight: 500,
    display: "flex",
    width: "336px",
    height: "364px",
    padding: "8px",
    justifyContent: "center",
    alignItems: "center",
    gap: fr.spacing("1w"),
    flexShrink: 0,
    background: "var(--primary-white, #FFF)",
    opacity: 0.3,
    border: "2px dashed #2F3A43",
    borderRadius: fr.spacing("2w"),
  }
}));

function App(props: Props) {

  const { className } = props;

  const { classes, cx } = useStyles();

  return <>
    <EnTete />
    <main className="homepage" role="main">
      <div className={cx(classes.block_accueil_nis2, className)}>
        <div className="limiter">
          <div className={cx(classes.appel_a_action, className)}>
            <div>
              <h1>MonParcoursNIS2</h1>
              <p className={cx(classes.gros, className)}>
                Accompagner les organisations dans la compréhension<br />
                et la mise en conformité à NIS2
              </p>
            </div>
            <p className={cx(classes.mea_gratuit, className)}>
              Gratuit et 100% en ligne
            </p>
            <p className={cx(classes.description, className)}>
              Au regard de la nouvelle directive NIS2, renforcez la sécurisation<br />
              de vos systèmes d’information grâce à l’accompagnement et aux services de l’ANSSI.
            </p>
            <Button onClick={function noRefCheck() { }}>S’inscrire</Button>
          </div>
          <div className={cx(classes['cool-illustration'], className)}>
            Insert cool illustration here
          </div>
        </div>
      </div>
    </main>
    <PiedDePage />
  </>;
}


export default App
