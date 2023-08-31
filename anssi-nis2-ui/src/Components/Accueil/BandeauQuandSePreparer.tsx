import {Props} from "../../Props.ts"
import {Button} from "@codegouvfr/react-dsfr/Button"
import {noRefClick} from "../Echaffaudages/AssistantsEchaffaudages.ts"
import CalendrierOctobre2024 from "../../assets/calendrier-oct-2024.svg"
import {ColorTheme, useColors} from "@codegouvfr/react-dsfr/useColors"
import {createMakeAndWithStyles} from "tss-react"
import styled from "@emotion/styled"
const { makeStyles } = createMakeAndWithStyles({
    useTheme: function (): ColorTheme {
        return useColors()
    },

})
const useStyles = makeStyles()(() => ({
    "root": {

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

const StyledDiv = styled.div`
  border-top: 4px solid var(--light-primary-blue-france-975, #F5F5FE);
  background-color: #F3F6FE;
`
const BandeauQuandSePreparer = (props: Props) => {
    const {className} = props

    const {classes, cx} = useStyles()

    return <>
        <StyledDiv className="fr-pt-10w fr-pb-13w">
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
        </StyledDiv>
    </>
}

export default BandeauQuandSePreparer