import {Button} from "@codegouvfr/react-dsfr/Button";
import {makeStyles} from "tss-react/dsfr";
import FondHabillageAccueil from "../assets/habillage-accueil-01.svg";
import {fr} from "@codegouvfr/react-dsfr";
import {Props} from "../Props.ts";
import {CoolIllustration} from "./Echaffaudages/CoolIllustration.tsx"
import {noRefClick} from "./Echaffaudages/AssistantsEchaffaudages.ts"

const useStyles = makeStyles()(() => ({
    "block_accueil_nis2": {
        background: "#F3F6FE",
        backgroundImage: `url(${FondHabillageAccueil})`,
        backgroundPosition: "bottom right",
        backgroundRepeat: "no-repeat",
    },
    "appel_a_action": {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("2w"),
    },
    "mea_gratuit": {
        backgroundColor: "var(--light-accent-green-emeraude-950, #C3FAD5)",
        width: "fit-content",
    },
}))

export const BandeauAccueil = (props: Props) => {
    const {className} = props

    const {classes, cx} = useStyles()

    return <div className={cx(classes.block_accueil_nis2, className)}>
        <div className="fr-container">
            <div className="fr-grid-row fr-pt-12w fr-pb-8w">
                <div className={cx([classes.appel_a_action, "fr-col"], className)}>
                    <div>
                        <h1 className="fr-text-title--blue-france fr-mb-0">MonParcoursNIS2</h1>
                        <p className="fr-text--lead">
                            Accompagner les organisations dans la compréhension<br/>
                            et la mise en conformité à NIS2
                        </p>
                    </div>
                    <p className={cx([classes.mea_gratuit, "fr-text--bold", "fr-text--lg", "fr-px-1v", "fr-py-0-5v"], className)}>
                        Gratuit et 100% en ligne
                    </p>
                    <p>
                        Au regard de la nouvelle directive NIS2, renforcez la sécurisation<br/>
                        de vos systèmes d’information grâce à l’accompagnement et aux services de l’ANSSI.
                    </p>
                    <Button className="fr-px-3w fr-pt-1-5v fr-pb-2v" onClick={noRefClick}>S’inscrire</Button>
                </div>
                <CoolIllustration className={props.className}/>
            </div>
        </div>
    </div>
}
