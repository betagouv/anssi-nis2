import "@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";
import "@gouvfr/dsfr/dist/utility/utility.css";

import "./style/accueil.scss";
import "./style/accueil.tablette.scss";
import "./style/accueil.petit-desktop.scss";
import "./style/accueil.desktop.scss";

import { DefaultComponent } from "./Services/Props";
import { Link } from "react-router-dom";
import {
  BandeauAccueil,
  BandeauConcerne,
  BandeauQuiEstANSSI,
  BandeauInformationRS,
} from "./Components/Accueil";
import MiseEnPage from "./Components/MiseEnPage.tsx";
import { MenuDesktop } from "./Components/MenuDesktop.tsx";
import BlocPrincipal from "./Components/BlocPrincipal.tsx";
import Paragraphe from "./Components/Accueil/Paragraphe.tsx";
import BandeauSePreparer from "./Components/Accueil/BandeauSePreprarer.tsx";

const Accueil: DefaultComponent = () => {
  return (
    <>
      <MiseEnPage page="Accueil">
        <MenuDesktop />
        <div className="fr-nis2-accueil">
          <BandeauAccueil />
          <BandeauConcerne />
          <BlocPrincipal id="explications-nis2">
            <h2 className="texte-primaire">Qu&apos;est-ce que NIS&nbsp;2 ?</h2>
            <div className="conteneur-paragraphes">
              <Paragraphe
                titre="Renforcer la cybersécurité dans l'UE"
                contenu="La directive NIS&nbsp;2 (en français : sécurité des réseaux et des systèmes d'Information) vise à renforcer le niveau de cybersécurité des tissus économique et administratif des pays membres de l'UE."
              ></Paragraphe>
              <Paragraphe
                titre="18 secteurs d'activités"
                contenu="Plusieurs milliers d'entités réparties sur 18 secteurs d'activité seront concernées. Pour l'essentiel, ces entités seront des collectivités territoriales, des administrations, ainsi que des moyennes et grandes entreprises."
              />
              <Paragraphe
                titre="Entités essentielles et importantes"
                contenu="Pour garantir une proportionnalité de traitement, la directive NIS&nbsp;2 distingue deux catégories d'entités régulées : les entités essentielles (EE) et les entités importantes (EI), selon leur degré de criticité, leur taille et leur chiffre d'affaires."
              />
              <Paragraphe
                titre="3 obligations majeures"
                contenu="Chaque entité régulée devra fournir certaines informations à l'ANSSI, mettre en place des mesures de gestion des risques adaptées, et déclarer ses incidents de sécurité. En cas de manquement, des sanctions financières (jusqu'à 2 % du CA mondial) pourront être imposées."
              />
              <div className="actions">
                <Link to="/infolettre" className="fr-nis2-bouton-tertiaire">
                  M&apos;abonner à la newsletter
                </Link>
                <Link
                  to="/directive#hero"
                  className="fr-nis2-bouton-secondaire"
                >
                  M&apos;informer sur la directive
                </Link>
              </div>
            </div>
          </BlocPrincipal>
          <BandeauSePreparer />
          <BandeauQuiEstANSSI />
          <BandeauInformationRS />
        </div>
      </MiseEnPage>
    </>
  );
};

export default Accueil;
