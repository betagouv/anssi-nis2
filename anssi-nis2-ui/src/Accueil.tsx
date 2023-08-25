import './App.css'

import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css'
import '@gouvfr/dsfr/dist/utility/utility.css'

import {DefaultComponent} from "./Props.ts"
import {
    BandeauAccueil,
    BandeauConcerne,
    BandeauNis2EU,
    BandeauQuiEstANSSI,
    BandeauInformation,
    BandeauQuandSePreparer,
} from "./Components/Accueil"
import MiseEnPage from "./Components/MiseEnPage.tsx"

const Accueil: DefaultComponent = ({className}) => {
    return <>
        <MiseEnPage
            className={className}
            page="Accueil">
            <BandeauAccueil className={className}/>
            <BandeauConcerne className={className}/>
            <BandeauNis2EU className={className}/>
            <BandeauQuandSePreparer className={className}/>
            <BandeauQuiEstANSSI className={className}/>
            <BandeauInformation className={className}/>
        </MiseEnPage>
    </>
}

export default Accueil
