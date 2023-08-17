import './App.css'
import { Header } from "@codegouvfr/react-dsfr/Header"
import { Footer } from "@codegouvfr/react-dsfr/Footer"

import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css'

import AnssiLogo from './assets/ANSSI.svg'
import HabillageAccueil from "./assets/habillage-accueil-01.svg"

function App() {
  return <>
    <div style={{ "minHeight": "100vh", "display": "flex", "flexDirection": "column" }}>
      <Header
        brandTop={<>R&Eacute;PUBLIQUE<br />FRAN&Ccedil;AISE</>}
        homeLinkProps={{
          href: '/',
          title: 'Accueil - MonParcoursNIS2 - ANSSI'
        }}
        id="fr-header-header-with-quick-access-items"
        operatorLogo={{
          alt: 'Logotype ANSSI',
          imgUrl: AnssiLogo,
          orientation: 'horizontal'
        }}
        quickAccessItems={[
          {
            iconId: 'fr-icon-live-fill',
            linkProps: { href: '#' },
            text: 'Webinaire de présentation'
          },
          {
            iconId: 'fr-icon-question-fill',
            linkProps: { href: '#' },
            text: 'FAQ NIS2'
          },
          {
            buttonProps: { onClick: () => { } },
            iconId: "fr-icon-arrow-right-line",
            text: 'Je m\'inscrits'
          }
        ]}
        serviceTagline=""
        serviceTitle="MonParcoursNIS2"
      />

      <Footer
        contentDescription={<>
          MonParcoursNIS2 aide les entités publiques et privées à sécuriser et homologuer leurs services numériques au prisme des obligations de la directive européenne NIS2.
          <br />
          <br />
          Il est développé par l’Agence nationale de la sécurité des systèmes d’information, en lien avec BetaGouv de la Direction interministérielle du numérique.
        </>}
        websiteMapLinkProps={{href: '#'}}
        accessibility="partially compliant"
        accessibilityLinkProps={{href: '#'}}
        termsLinkProps={{href: '#'}}
      />
    </div>
  </>;
}

export default App
