import {Props} from "../Props.ts"
import {makeStyles} from "tss-react/dsfr"
import {Button} from "@codegouvfr/react-dsfr/Button"
import {noRefClick} from "./Echaffaudages/AssistantsEchaffaudages.ts"
import CalendrierOctobre2024 from "../assets/calendrier-oct-2024.svg"

const useStyles = makeStyles()(() => ({
    "root": {
        borderTop: "4px solid var(--light-primary-blue-france-975, #F5F5FE)",
        backgroundColor: "#F3F6FE", // TODO: was ##F3F6FE
        "& h2": {
            textTransform: "uppercase",
            textAlign: "center",
        },
        "& .calendrier": {
            textAlign: "center",
        },
    },
    "mea-faits": {
        backgroundColor: "var(--light-accent-blue-cumulus-925, #DAE6FD)",
        width: "fit-content",
    },
}))

export const BandeauQuandSePreparer = (props: Props) => {
    const {className} = props

    const {classes, cx} = useStyles()

    return <>
        <div className={cx([classes["root"], "fr-pt-10w", "fr-pb-13w"], className)}>
            <div className={"fr-container"}>
                <div className="fr-grid-row--center">
                    <h2 className="fr-mb-7w">
                        Quand se préparer ?
                    </h2>
                </div>
                <div className="fr-grid-row">
                    <div className="fr-col-5 calendrier">
                        <img src={CalendrierOctobre2024} alt="Calendrier 'Octobre 2024'"/>
                    </div>
                    <div className="fr-col">
                        <p className="fr-text--lead fr-text--bold fr-pb-4v">
                            L’administration française a jusqu’au 17 octobre 2024 pour transposer les obligations de
                            cette
                            directive dans le droit national. Son entrée en vigueur, marquant le début des délai de mise
                            en
                            conformité, peut donc être estimée à<br/>
                            <span
                                className={cx([classes["mea-faits"]], className)}>
                                fin de 2e semestre 2024.
                            </span>
                        </p>
                        <p className="fr-text--lead  fr-pb-4v">
                            Pour améliorer au plus tôt votre protection face aux menaces cyber et vous préparer à ces
                            futures obligations, suivez-nous dès à présent.
                        </p>
                        <Button
                            className="fr-btn"
                            onClick={noRefClick}
                        >
                            Rester informé
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
