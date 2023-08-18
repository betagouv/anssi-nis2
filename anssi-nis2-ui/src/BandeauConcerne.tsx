import {Props} from "./Props.ts"
import {makeStyles} from "tss-react/dsfr"
import {fr} from "@codegouvfr/react-dsfr"
import {Button} from "@codegouvfr/react-dsfr/Button"

const useStyles = makeStyles()((theme) => ({
    "bandeau-suis-je-concerne": {
        backgroundColor: theme.decisions.background.flat.blueFrance.default, // was #101070
        color: "var(--grey-1000-100)",
        "& .limiter": {
            padding: "80px 120px 104px 120px",
            width: "1200px",
            margin: "0 auto",
            textAlign: "center",
            gap: fr.spacing("5w"),
        },
        "& h1": {
            color: "var(--grey-1000-100)",
        },
        "& Button": {
            backgroundColor: theme.decisions.background.open.blueFrance.default, // was #E3E3FD
            color: "#101070",
        },
    },
}))

export const BandeauConcerne = (props: Props) => {
    const {className} = props

    const {classes, cx} = useStyles()

    return <>
        <div className={cx(classes["bandeau-suis-je-concerne"], className)}>
            <div className="limiter">
                <h1>Suis-je concerné ?</h1>
                <p>
                    Simulez dès à présent votre potentielle éligibilité à la directive NIS2 <br/>
                    et débutons ensemble l’accompagnement de votre structure.
                </p>
                <Button>Simuler mon éligibilité</Button>
            </div>
        </div>
    </>
}
