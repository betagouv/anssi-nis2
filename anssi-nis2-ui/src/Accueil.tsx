import "@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";
import "@gouvfr/dsfr/dist/utility/utility.css";

import "./accueil.scss";

import { DefaultComponent } from "./Services/Props";
import {
  BandeauAccueil,
  BandeauConcerne,
  BandeauNis2EU,
  BandeauQuiEstANSSI,
  BandeauInformationRS,
  BandeauQuandSePreparer,
  BandeauObligations,
  BandeauEnSavoirPlus,
} from "./Components/Accueil";
import MiseEnPage from "./Components/MiseEnPage.tsx";
import {MenuMobile} from "./Components/MenuMobile.tsx";
import {MenuDesktop} from "./Components/MenuDesktop.tsx";
import BlocPrincipal from "./Components/BlocPrincipal.tsx";
import Paragraphe from "./Components/Accueil/Paragraphe.tsx";
import {Link} from "react-router-dom";
import CarteSePreparer from "./Components/Accueil/CarteSePreparer.tsx";
import BandeauSePreparer from "./Components/Accueil/BandeauSePreprarer.tsx";
import JalonEtape from "./Components/Accueil/JalonEtape.tsx";

const Accueil: DefaultComponent = () => {
  return (
    <>
      <MiseEnPage page="Accueil">
        <MenuMobile/>
        <MenuDesktop/>
        <div className="fr-nis2-accueil">
          <BandeauAccueil/>
          <BandeauConcerne/>
          <BlocPrincipal id="explications-nis2">
            <h2 className="texte-primaire">Qu'est-ce que NIS 2 ?</h2>
            <div className="conteneur-paragraphes">
              <Paragraphe titre="Renforcer la cybersécurité dans l'UE" contenu="La directive NIS 2 (Network and Information System Security – en français : sécurité des réseaux et des systèmes d'Information) vise à renforcer le niveau de cybersécurité des tissus économique et administratif des pays membres de l'UE."></Paragraphe>
              <Paragraphe titre="18 secteurs d'activités" contenu="Plus de 10 000 entités réparties sur 18 secteurs d'activité seront concernées. Pour l'essentiel, ces entités seront des collectivités territoriales, des administrations, ainsi que des moyennes et grandes entreprises." />
              <Paragraphe titre="Entités essentielles et importantes" contenu="Pour garantir une proportionnalité de traitement, la directive NIS 2 distingue deux catégories d'entités régulées : les entités essentielles (EE) et les entités importantes (EI), selon leur degré de criticité, leur taille et leur chiffre d'affaires." />
              <Paragraphe titre="3 obligations majeures" contenu="Chaque entité assujettie devra fournir certaines informations à l'ANSSI, mettre en place des mesures de gestion des risques adaptées, et déclarer ses incidents de sécurité. En cas de manquement, des sanctions financières (jusqu'à 2 % du CA mondial) pourront être imposées." />
              <Link to='/' className="fr-nis2-bouton-secondaire">
                M'informer sur la directive
              </Link>
            </div>
          </BlocPrincipal>
          <BandeauSePreparer />
          <BlocPrincipal id="etapes" className="fond-primaire">
            <h2 className="texte-blanc">Les étapes de la transposition</h2>
            <div className="conteneur-etapes">
              <JalonEtape annee={2021} jalons={[{contenu: "Négociations européennes autour de la révision de NIS 1"}]} />
              <JalonEtape annee={2022} jalons={[{date: "27 décembre 2022", contenu: "Publication de la directive NIS 2 au Journal Officiel de l'UE"}]} />
              <JalonEtape annee={2024} jalons={[{date: "17 octobre 2024", contenu: "Échéance de transposition nationale pour chaque État membre"}]} />
              <JalonEtape annee={2025} jalons={[{date: "17 janvier 2025", contenu: "Les États-membres informent la Commission des règles et mesures adoptées"}, {date: "17 avril 2025", contenu: "Chaque État membre établit la liste des EE et EI"}]} />
            </div>
          </BlocPrincipal>
          <BandeauQuiEstANSSI/>
          <BandeauInformationRS/>
        </div>
      </MiseEnPage>
    </>
);
};

export default Accueil;
