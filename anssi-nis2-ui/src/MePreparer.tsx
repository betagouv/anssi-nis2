import "@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";
import "@gouvfr/dsfr/dist/utility/utility.css";

import "./style/me-preparer.scss";
import Hero from "../src/assets/directive-hero.svg";

import { DefaultComponent } from "./Services/Props";
import MiseEnPage from "./Components/MiseEnPage.tsx";
import { MenuMobile } from "./Components/MenuMobile.tsx";
import { MenuDesktop } from "./Components/MenuDesktop.tsx";
import BlocPrincipal from "./Components/BlocPrincipal.tsx";
import { SommaireSynchroAvecScroll } from "./Components/General/SommaireSynchoAvecScroll.tsx";

const MePreparer: DefaultComponent = () => {
  return (
    <>
      <MiseEnPage page="Se préparer">
        <MenuMobile />
        <MenuDesktop />
        <div className="fr-nis2-me-preparer">
          <BlocPrincipal className="fond-primaire" id="hero">
            <h1 className="texte-blanc">
              Se préparer à NIS&nbsp;2 en attendant la finalisation des textes
              de transposition
            </h1>
            <img src={Hero} alt="Illustration du Hero de la directive NIS 2" />
          </BlocPrincipal>
          <div className="page">
            <SommaireSynchroAvecScroll
              liens={[{ id: "introduction", titre: "Introduction" }]}
            />
            <div className="contenu-page">
              <BlocPrincipal id="introduction" className="fond-blanc">
                <h2 className="texte-primaire">Introduction</h2>
                <p>
                  La transposition de la directive NIS&nbsp;2 en France est en
                  cours. En attendant la publication de l&apos;ensemble des
                  textes de transposition, et compte tenu de la menace actuelle,
                  les futures entités essentielles et importantes sont invitées
                  à s&apos;engager dès à présent dans une démarche visant à
                  renforcer leur niveau de sécurité.
                </p>
                <p>
                  Aussi, cette page a pour objectif de partager des conseils
                  préparatoires à la bonne mise en œuvre des exigences découlant
                  de la directive européenne, en prévision de l&apos;entrée en
                  vigueur de la réglementation nationale.
                </p>
              </BlocPrincipal>
            </div>
          </div>
        </div>
      </MiseEnPage>
    </>
  );
};

export default MePreparer;
