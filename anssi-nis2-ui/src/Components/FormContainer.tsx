import {DefaultComponent} from "../Props.ts"

export const FormContainer: DefaultComponent = ({children}) =>
    <div className="fr-container fr-container--fluid fr-mb-md-14v">
        <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
                <div className="fr-container fr-background-alt--blue-france fr-px-md-0 fr-py-10v fr-py-md-14v">
                    {children}
                </div>
            </div>
        </div>
    </div>