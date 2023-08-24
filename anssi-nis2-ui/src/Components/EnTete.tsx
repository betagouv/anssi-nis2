import Header from "@codegouvfr/react-dsfr/Header";
import AnssiLogo from '../assets/ANSSI.svg'
import {noRefClick} from "./Echaffaudages/AssistantsEchaffaudages.ts"

const EnTete = () => <Header
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
            linkProps: { href: 'https://www.dailymotion.com/video/x8l50hd' },
            text: 'Webinaire de présentation'
          },
          {
            iconId: 'fr-icon-question-fill',
            linkProps: { href: '#' },
            text: 'FAQ NIS2'
          },
          {
            buttonProps: { onClick: noRefClick },
            iconId: "fr-icon-arrow-right-line",
            text: 'Je m\'inscrits'
          }
        ]}
        serviceTagline=""
        serviceTitle="MonParcoursNIS2"
      />

export default EnTete
