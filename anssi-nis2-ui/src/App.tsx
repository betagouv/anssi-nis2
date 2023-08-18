import './App.css'

import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css'
//NOTE: If you get "SyntaxError: Cannot use import statement outside a module" add tss-react here in your next.config.js: https://github.com/garronej/react-dsfr-next-demo/blob/43ecfa03d5416f2446b6867af65c7e3c7e7e41ef/next.config.js#L14
import EnTete from './Components/EnTete'
import PiedDePage from './Components/PiedDePage'
import {BandeauAccueil} from "./BandeauAccueil.tsx"
import {Props} from "./Props.ts"
import {BandeauConcerne} from "./BandeauConcerne.tsx"

const App = (props: Props) => <>
  <EnTete/>
  <main className="homepage" role="main">
    <BandeauAccueil className={props.className}/>
    <BandeauConcerne className={props.className}/>
  </main>
  <PiedDePage/>
</>

export default App
