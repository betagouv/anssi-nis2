import {Props} from "./Props.ts"
import {makeStyles} from "tss-react/dsfr"
import {fr} from "@codegouvfr/react-dsfr"
import {Button} from "@codegouvfr/react-dsfr/Button"

const useStyles = makeStyles()((theme) => ({
    "bandeau-suis-je-concerne": {
        backgroundColor: theme.decisions.background.flat.blueFrance.default, // TODO: was #101070
        color: "var(--grey-1000-100)",
        "& .limiter": {
            padding: [
                fr.spacing("10w"),
                fr.spacing("15w"),
                fr.spacing("13w"),
                fr.spacing("15w"),
            ].join(" "),
            width: "1200px", // TODO: passage sur grid system
            textAlign: "center",
            gap: fr.spacing("5w"),
        },
        "& h1": {
            color: "var(--grey-1000-100)",
            textTransform: "uppercase",
        },
        "& p, & h1": {
            marginBottom: fr.spacing("5w"),
        },
        "& Button": {
            backgroundColor: theme.decisions.background.open.blueFrance.default, // TODO: was #E3E3FD
        },
    },
}))

export const BandeauConcerne = (props: Props) => {
    const {className} = props

    const {classes, cx} = useStyles()

    return <>
        <div className={cx(classes["bandeau-suis-je-concerne"], className)}>
            <div className="limiter fr-my-0 fr-mx-auto">
                <h1>Suis-je concerné ?</h1>
                <p className="fr-text--lead">
                    Simulez dès à présent votre potentielle éligibilité à la directive NIS2 <br/>
                    et débutons ensemble l’accompagnement de votre structure.
                </p>
                <Button className="fr-btn fr-btn--tertiary fr-px-3w fr-py-2v">Simuler mon éligibilité</Button>
            </div>
        </div>
    </>
}
