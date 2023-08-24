import {Props} from "../Props.ts"
import {makeStyles} from "tss-react/dsfr";

const useStyles = makeStyles()(() => ({
    "root": {},
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BandeauInformation = (props: Props) => {
    const {className} = props

    const {classes, cx} = useStyles()

    return <div className="fr-follow">
        <div className={cx([classes.root, "fr-container"], className)}>
            <div className="fr-grid-row">
                <div className="fr-col-12 fr-col-md-8">
                    <div className="fr-follow__newsletter">
                        {/* TODO reprendre texte usuel ? */}
                        <div><p className="fr-h5">Inscrivez-vous pour rester informé</p><p
                            className="fr-text--sm">Nous vous accompagnerons dans votre montée en maturité cyber en vous
                            informant des bonnes pratiques, évolutions de la directive et attendus pour votre
                            organisation.</p></div>
                        <div>
                            <button className="fr-btn" title="S‘abonner à notre lettre d’information"> S'abonner
                            </button>
                        </div>
                    </div>
                </div>
                <div className="fr-col-12 fr-col-md-4">
                    <div className="fr-follow__social"><p className="fr-h5">Suivez-nous <br/> sur les réseaux sociaux
                    </p>
                        <ul className="fr-links-group">
                            <li><a className="fr-link--twitter fr-link"
                                   title="S'abonner à notre compte Twitter - nouvelle fenêtre"
                                   href="https://www.twitter.com/anssi_fr"
                                   target="_blank"> twitter </a></li>
                            <li><a className="fr-link--linkedin fr-link"
                                   title="Nous suivre sur LinkedIn - nouvelle fenêtre"
                                   href="https://www.linkedin.com/company/anssi-fr"
                                   target="_blank"> linkedin </a></li>
                            <li><a className={cx(["fr-link--dailymotion fr-link"], className)}
                                   title="Nos vidéos sur Dailymotion - nouvelle fenêtre"
                                   href="https://www.dailymotion.com/ANSSI_FR"
                                   target="_blank"> dailymotion </a></li>
                            <li><a className="fr-link--github fr-link"
                                   title="Github de l'ANSSI - nouvelle fenêtre"
                                   href="https://github.com/ANSSI-FR"
                                   target="_blank"> dailymotion </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
}