import {Props} from "../Props.ts"
import {makeStyles} from "tss-react/dsfr"
import {Button} from "@codegouvfr/react-dsfr/Button"
import {noRefClick} from "./Echaffaudages/AssistantsEchaffaudages.ts"
import AnssiLogo from '../assets/ANSSI-180.svg'

const useStyles = makeStyles()(() => ({
    "root": {
        borderTop: "4px solid var(--light-primary-blue-france-975, #F5F5FE)",
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
}))

export const BandeauQuiEstANSSI = (props: Props) => {
    const {className} = props

    const {classes, cx} = useStyles()

    return <>
        <div className={cx([classes["root"], "fr-pt-10w", "fr-pb-13w"], className)}>
            <div className={"fr-container"}>
                <div className="fr-grid-row--center">
                    <h2 className="fr-mb-7w">
                        Qui est l’ANSSI ?
                    </h2>
                    <img src={AnssiLogo} alt="Logo ANSSI"  className="fr-mb-7w"/>
                    <div className="fr-col-8 fr-col-offset-2 fr-px-2w">
                        <p className="fr-text--lead fr-mb-4w">
                            L’Agence Nationale de la Sécurité des Systèmes d’Information assure la sécurité numérique de
                            l’État, mais <span className="fr-text--bold">elle est aussi chargée d’une mission de conseil et de soutien aux
                            administrations et aux opérateurs d’importance vitale.</span>
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
}
