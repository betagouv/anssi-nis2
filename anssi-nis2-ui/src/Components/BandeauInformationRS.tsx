import {Props} from "../Props.ts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BandeauInformation = (_props: Props) => {

    return <div className="fr-follow">
        <div className="fr-container">
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
                                   title="[À MODIFIER - Intitulé du lien] - nouvelle fenêtre"
                                   href="[À MODIFIER - Lien vers le twitter de l'organisation]"
                                   target="_blank"> twitter </a></li>
                            <li><a className="fr-link--linkedin fr-link"
                                   title="[À MODIFIER - Intitulé du lien] - nouvelle fenêtre"
                                   href="[À MODIFIER - Lien vers le linkedin de l'organisation]"
                                   target="_blank"> linkedin </a></li>
                            <li><a className="fr-link--youtube fr-link"
                                   title="[À MODIFIER - Intitulé du lien] - nouvelle fenêtre"
                                   href="[À MODIFIER - Lien vers le youtube de l'organisation]"
                                   target="_blank"> youtube </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
}