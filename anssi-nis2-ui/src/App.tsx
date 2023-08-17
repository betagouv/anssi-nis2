import './App.css'
import { Header } from "@codegouvfr/react-dsfr/Header";
import AnssiLogo from './assets/ANSSI.svg'
import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css'

function App() {
  return (
    <>
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
            iconId: 'fr-icon-add-circle-line',
            linkProps: {
              href: '#'
            },
            text: 'Webinaire de présentation'
          },
          {
            iconId: 'fr-icon-mail-fill',
            linkProps: {
              href: '#'
            },
            text: 'FAQ NIS2'
          },
          {
            buttonProps: {
              onClick: function noRefCheck() { }
            },
            iconId: 'ri-account-box-line',
            text: 'Se connecter'
          }
        ]}
        serviceTagline=""
        serviceTitle="MonParcoursNIS2"
      />
    </>
  )
}

export default App
