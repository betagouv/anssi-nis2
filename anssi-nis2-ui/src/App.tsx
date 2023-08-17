import './App.css'

import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css'

import EnTete from './Components/EnTete'
import PiedDePage from './Components/PiedDePage'
import { Button } from "@codegouvfr/react-dsfr/Button";

function App() {
  return <>
    <EnTete />
    <main className="homepage" role="main">
      <div className="main-nis2">
        <div className="limiter">
          <div className="appel-a-action">
            <h1>MonParcoursNIS2</h1>
            <p>Accompagner les organisations dans la compréhension et la mise en conformité à NIS2</p>
            <p>Gratuit et 100% en ligne</p>
            <p>Au regard de la nouvelle directive NIS2, renforcez la sécurisation de vos systèmes d’information grâce à l’accompagnement et aux services de l’ANSSI.</p>
            <Button onClick={function noRefCheck() { }}>
              Label button
            </Button>
          </div>
        </div>
      </div>
    </main>
    <PiedDePage />
  </>;
}

export default App
