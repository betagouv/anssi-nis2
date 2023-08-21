import {Button} from "@codegouvfr/react-dsfr/Button";
import {makeStyles} from "tss-react/dsfr";
import {Props} from "../Props.ts";
import {noRefClick} from "./Echaffaudages/AssistantsEchaffaudages.ts"
import FondEuLogo from "../assets/EU-logo.svg"

const useStyles = makeStyles()(() => ({
    "bandeau-nis2-eu": {
        "& h2": {
            textAlign: "center",
            textTransform: "uppercase",
        },
    },
    "boite-faits": {},
    "mea-faits": {
        backgroundColor: "#FCEEAC",
        width: "fit-content",
    },
    "logo-eu": {
        "& > div": {
            backgroundImage: `url(${FondEuLogo})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "486px",
            height: "399px",
            alignItems: "center",
            display: "flex",
        },
        "& div p": {
            textAlign: "center",
        },
        textAlign: "center",
    },
}))

export const BandeauNis2EU = (props: Props) => {
    const {className} = props

    const {classes, cx} = useStyles()

    return <>
        <div className={cx(classes["bandeau-nis2-eu"], className)}>
            <div className="fr-container">
                <div className="fr-grid-row--center fr-pt-10w fr-pb-5w">
                    <h2 className="fr-h1">
                        NIS2, la nouvelle directive <br/>
                        européenne cyber
                    </h2>
                </div>
                <div className="fr-grid-row">
                    <div className={cx([classes["boite-faits"], "fr-col"], className)}>
                        <div>
                            <p className="fr-h4 fr-mb-4w">
                                En France, le nombre d'intrusions avérées dans<br/>
                                des systèmes d'information signalées à l'ANSSI<br/>
                                <span
                                    className={cx([classes["mea-faits"], "fr-h4"], className)}>
                                a augmenté de 37% entre 2020 et 2021.
                            </span>
                            </p>
                        </div>
                        <p className="fr-text--lead fr-mb-4w">
                            Plusieurs milliers d’entreprises et d’administrations publiques françaises seront soumises
                            aux exigences de la nouvelle directive européenne sur la sécurité des réseaux et des
                            systèmes d’information ou « directive NIS2 » afin de renforcer leur cybersécurité et
                            harmoniser les pratiques à l’échelle européenne.
                        </p>
                        {/* TODO: padding was "6px, 24px, 10px, 18px" */}
                        <Button
                            priority="secondary"
                            onClick={noRefClick}
                            iconId={"fr-icon-question-line"}
                        >
                            Voir les FAQ
                        </Button>
                    </div>
                    <div className={cx([classes["logo-eu"], "fr-col-5"], className)}>
                        <div className="fr-col--middle">
                            <p className="fr-h2"
                               style={{position: "relative", left: "50%", marginLeft: "-2.2rem"}}>
                                {/* TODO : trouver une meilleure manière de positionner le texte du logo */}
                                NIS2
                            </p>
                        </div>
                        <p className="fr-definition fr-text--bold fr-mb-0">NIS : Network and and Information Security</p>
                        <p className="fr-definition fr-text--bold fr-mb-0">SRI : Sécurité des Réseau et de l’Information</p>
                    </div>
                </div>
                <div className="fr-grid-row">
                    {/* TODO: utiliser mise en avant adéquate */}
                    {/* TODO: ajouter les tiles/cards des obligations */}
                    <h3>Les entités concernées devront se conformer à certaines obligations auprès de l’ANSSI</h3>
                </div>
            </div>
        </div>
    </>
}
