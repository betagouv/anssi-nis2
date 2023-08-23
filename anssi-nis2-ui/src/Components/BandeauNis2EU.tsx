import {Button} from "@codegouvfr/react-dsfr/Button";
import {makeStyles} from "tss-react/dsfr";
import {Props} from "../Props.ts";
import {noRefClick} from "./Echaffaudages/AssistantsEchaffaudages.ts"
import FondEuLogo from "../assets/EU-logo.svg"
import ObligationNotifier from "../assets/obligation-notifier.svg"
import ObligationMesuresSecurite from "../assets/obligation-mesures-securite.svg"
import ObligationMaj from "../assets/obligation-maj.svg"
import ObligationIncidents from "../assets/obligation-incidents.svg"
import {fr} from "@codegouvfr/react-dsfr"


const useStyles = makeStyles()(() => ({
    "bandeau-nis2-eu": {
        "& h2": {
            textAlign: "center",
            textTransform: "uppercase",
        },
    },
    "eu": {},
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
    "obligations": {
        "& h3": {
            textAlign: "center",
        },
        "& li": {
            listStyle: "none",
            textAlign: "center",
        },
        "& img": {
            float: "none",
        },
        paddingTop: fr.spacing("8v"),
        // TODO bordure autour, pas en travers du titre pour le haut. Espacement à revoir
        border: `2px solid ${fr.colors.decisions.border.plain.grey.default}`, // TODO was #2F3A43
    },
}))

const ElementObligation = (props: { imageSrc: string, title: string }) => {
    const {imageSrc, title} = props

    return <>
        <li className="fr-col">
            <img src={imageSrc} alt={title}/>
            <p className="fr-text--lead">{title}</p>
        </li>
    </>
}

export const BandeauNis2EU = (props: Props) => {
    const {className} = props

    const {classes, cx} = useStyles()

    return <>
        <div className={cx([classes["bandeau-nis2-eu"], "fr-pb-13w"], className)}>
            <div className="fr-container">
                <div className="fr-grid-row--center fr-pt-10w fr-pb-5w">
                    <h2 className="fr-h1">
                        NIS2, la nouvelle directive <br/>
                        européenne cyber
                    </h2>
                </div>
                <div className={cx([classes["eu"], "fr-grid-row", "fr-pb-4w"], className)}>
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
                        <p className="fr-definition fr-text--bold fr-mb-0">
                            NIS : Network and and Information Security
                        </p>
                        <p className="fr-definition fr-text--bold fr-mb-0">
                            SRI : Sécurité des Réseau et de l’Information
                        </p>
                    </div>
                </div>
                <div className={cx([classes["obligations"], "fr-pt-4w"], className)}>
                    <div className={cx(["fr-col--middle"], className)}>
                        {/* TODO: utiliser mise en avant adéquate */}
                        <h3 className="fr-h4">
                            Les entités concernées devront se conformer à certaines obligations auprès de l’ANSSI
                        </h3>
                    </div>
                    <ul className={cx(["fr-grid-row"], className)}>
                        {/* TODO: améliorer les tiles/cards des obligations */}
                        <ElementObligation title="Se notifier à l'ANSSI" imageSrc={ObligationNotifier}/>
                        <ElementObligation title="Mettre en œuvre des mesures de sécurité"
                                           imageSrc={ObligationMesuresSecurite}/>
                        <ElementObligation title="Mettre à jour ses systèmes d'information" imageSrc={ObligationMaj}/>
                        <ElementObligation title="Notifier les incidents de sécurité" imageSrc={ObligationIncidents}/>
                    </ul>
                </div>
            </div>
        </div>
    </>
}
