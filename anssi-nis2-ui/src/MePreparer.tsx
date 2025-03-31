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
              liens={[
                { id: "introduction", titre: "Introduction" },
                {
                  id: "s-informer",
                  titre: "S'informer sur la directive NIS 2",
                },
                { id: "se-tenir-informes", titre: "Se tenir informés" },
                {
                  id: "determiner-si-concernee-par-nis2",
                  titre:
                    "Déterminer si votre entité est concernée par la directive NIS 2",
                },
              ]}
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

              <BlocPrincipal id="s-informer" className="fond-blanc fr-pt-0">
                <h2 className="texte-primaire">
                  S&apos;informer sur la directive NIS&nbsp;2
                </h2>
                <p>
                  MonEspaceNIS2 propose des contenus d&apos;information sur la
                  directive NIS&nbsp;2 :
                  <ul>
                    <li>
                      <a href="/directive">
                        Une page d&apos;information générale sur la directive
                        NIS&nbsp;2
                      </a>
                      , que les entités peuvent consulter pour en savoir plus
                      sur la directive NIS&nbsp;2 et sa transposition en droit
                      français. Cette page traite notamment des entités
                      essentielles et importantes, des secteurs concernés, des
                      obligations, etc.
                    </li>
                    <li>
                      <a
                        href="https://aide.monespacenis2.cyber.gouv.fr/fr/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Une FAQ, alimentée et enrichie régulièrement.
                      </a>
                    </li>
                  </ul>
                  L&apos;ensemble de ces contenus seront mis à jour au fur et à
                  mesure de l&apos;avancement de la transposition de la
                  directive NIS&nbsp;2 en droit français.
                </p>
              </BlocPrincipal>

              <BlocPrincipal
                id="se-tenir-informes"
                className="fond-blanc fr-pt-0"
              >
                <h2 className="texte-primaire">Se tenir informés</h2>
                <p>
                  Consciente de l&apos;importance de pouvoir tenir informées les
                  entités concernées par la directive NIS&nbsp;2, l&apos;ANSSI
                  propose la souscription à une lettre d&apos;information dédiée
                  à NIS&nbsp;2 qui a pour objectifs :
                  <ul className="fr-mb-5v">
                    <li>
                      de partager régulièrement l&apos;avancement du processus
                      de transposition nationale
                    </li>
                    <li>d&apos;aborder certaines thématiques métier </li>
                    <li>
                      de communiquer sur les évolutions apportées au site
                      MonEspaceNIS2
                    </li>
                    <li>
                      de faire connaître des évènements en lien avec la mise en
                      œuvre de la directive NIS&nbsp;2
                    </li>
                  </ul>
                  <a className="fr-nis2-bouton-principal" href="/infolettre">
                    S&apos;inscrire à l&apos;infolettre
                  </a>
                </p>
              </BlocPrincipal>

              <BlocPrincipal
                id="determiner-si-concernee-par-nis2"
                className="fond-blanc fr-pt-0"
              >
                <h2 className="texte-primaire">
                  Déterminer si votre entité est concernée par la directive
                  NIS&nbsp;2
                </h2>

                <p>
                  Le simulateur mis à disposition par l&apos;ANSSI propose un
                  parcours simple et rapide permettant d&apos;avoir une première
                  indication sur le potentiel statut essentiel ou important de
                  votre entité. Nous vous conseillons donc, dans le cas où le
                  statut de votre entité vis-à-vis de la directive NIS&nbsp;2 ne
                  serait pas encore déterminé, de réaliser le parcours proposé
                  par le simulateur.
                </p>
                <p>
                  Quelques conseils pour une meilleure utilisation de ce
                  simulateur :
                  <ul>
                    <li>
                      Il est préférable d&apos;associer des compétences
                      juridiques à la démarche d&apos;auto-évaluation du statut
                      de l&apos;entité afin de déterminer si celle-ci entre dans
                      le périmètre des entités régulées par la directive
                      NIS&nbsp;2.
                    </li>
                    <li>
                      Il a été observé que certaines entités, lors de leur
                      utilisation du simulateur, confondent le secteur de
                      réalisation de leurs propres activités avec le secteur
                      d&apos;activité des clients qu&apos;elles fournissent ou
                      dont elles sont les sous-traitants. Une telle confusion
                      fausse les résultats du test. Les entités utilisant le
                      simulateur sont donc invitées à renseigner les différentes
                      rubriques avec le plus grand soin.
                    </li>
                    <ul>
                      <li>
                        À titre d&apos;exemple, un fournisseur de turbine
                        d&apos;éolienne, pouvant se considérer comme étant du
                        secteur «&nbsp;Énergie&nbsp;», sera en réalité associé
                        au secteur «&nbsp;Fabrication&nbsp;» (correspondant à
                        l&apos;industrie manufacturière) selon le prisme établi
                        par la directive NIS&nbsp;2.
                      </li>
                      <li>
                        Les entités du secteur de l&apos;industrie
                        manufacturière sont invitées à consulter avec attention
                        le secteur «&nbsp;Fabrication&nbsp;» de ce simulateur,
                        qui regroupe plus de 500 activités distinctes.
                      </li>
                    </ul>
                  </ul>
                  En tout état de cause, recourir au simulateur, dont le
                  résultat est dépendant de l&apos;exactitude des données
                  fournies en entrée, ne dispense pas d&apos;une analyse au vu
                  des textes en vigueur et des circonstances propres à chaque
                  entité.
                </p>
                <a className="fr-nis2-bouton-principal" href="/simulateur">
                  Accéder au simulateur
                </a>
              </BlocPrincipal>
            </div>
          </div>
        </div>
      </MiseEnPage>
    </>
  );
};

export default MePreparer;
