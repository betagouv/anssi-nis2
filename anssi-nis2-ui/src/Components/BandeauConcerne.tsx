import {Props} from "../Props.ts"
import {makeStyles} from "tss-react/dsfr"
import {Button} from "@codegouvfr/react-dsfr/Button"
import {noRefClick} from "./Echaffaudages/AssistantsEchaffaudages.ts"

const useStyles = makeStyles()((theme) => ({
    "bandeau-suis-je-concerne": {
        backgroundColor: theme.decisions.background.flat.blueFrance.default, // TODO: was #101070
        textAlign: "center",
        "& h2": {textTransform: "uppercase"},
    },
}))

export const BandeauConcerne = (props: Props) => {
    const {className} = props

    const {classes, cx} = useStyles()

    return <>
        <div className={cx([classes["bandeau-suis-je-concerne"]], className)}>
            <div className="fr-my-0 fr-mx-auto fr-px-15w fr-pt-10w fr-pb-13w">
                <h2 className="fr-text-inverted--grey fr-mb-5w fr-h1">
                    Suis-je concerné ?
                </h2>
                <p className="fr-text--lead fr-text-inverted--grey fr-mb-5w">
                    Simulez dès à présent votre potentielle éligibilité à la directive NIS2 <br/>
                    et débutons ensemble l’accompagnement de votre structure.
                </p>
                <Button
                    className="fr-btn fr-btn--secondary fr-background-alt--blue-france fr-px-3w fr-py-2v"
                    onClick={noRefClick}
                >
                    Simuler mon éligibilité
                </Button>
            </div>
        </div>
    </>
}
