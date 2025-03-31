import "@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";
import "@gouvfr/dsfr/dist/utility/utility.css";

import "./style/me-preparer.scss";
import "./style/me-preparer.tablette.scss";
import "./style/me-preparer.desktop.scss";
import Hero from "../src/assets/directive-hero.svg";

import { DefaultComponent } from "./Services/Props";
import MiseEnPage from "./Components/MiseEnPage.tsx";
import { MenuDesktop } from "./Components/MenuDesktop.tsx";
import BlocPrincipal from "./Components/BlocPrincipal.tsx";
import { SommaireSynchroAvecScroll } from "./Components/General/SommaireSynchoAvecScroll.tsx";

const MePreparer: DefaultComponent = () => {
  return (
    <>
      <MiseEnPage page="Se préparer">
        <MenuDesktop />
        <div className="fr-nis2-me-preparer fr-pb-0">
          <BlocPrincipal className="fond-primaire" id="hero">
            <h1 className="texte-blanc">
              Me préparer à NIS&nbsp;2 en attendant la finalisation des textes
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
                {
                  id: "identifier-un-responsable",
                  titre: "Identifier un responsable en charge de NIS 2",
                },
                { id: "se-pre-enregistrer", titre: "Se pré-enregistrer" },
                {
                  id: "lister-les-systemes-d-information-de-votre-entite",
                  titre: "Lister les systèmes d’information de votre entité",
                },
                {
                  id: "s-organiser",
                  titre:
                    "S’organiser pour être en mesure de déclarer des incidents importants",
                },
                {
                  id: "demarrer",
                  titre: "Démarrer des premières actions de sécurisation ",
                },
              ]}
            />
            <div className="contenu-page">
              <BlocPrincipal id="introduction" className="fond-blanc">
                <h3>Introduction</h3>
                <p>
                  La transposition de la directive NIS&nbsp;2 en France est en
                  cours. En attendant la publication de l’ensemble des textes de
                  transposition, et compte tenu de la menace actuelle, les
                  futures entités essentielles et importantes sont invitées à
                  s’engager dès à présent dans une démarche visant à renforcer
                  leur niveau de sécurité.
                </p>
                <p>
                  Aussi, cette page a pour objectif de partager des conseils
                  préparatoires à la bonne mise en œuvre des exigences découlant
                  de la directive européenne, en prévision de l’entrée en
                  vigueur de la réglementation nationale.
                </p>
              </BlocPrincipal>

              <BlocPrincipal id="s-informer" className="fond-blanc fr-pt-0">
                <h3>S’informer sur la directive NIS&nbsp;2</h3>
                <p>
                  MonEspaceNIS2 propose des contenus d’information sur la
                  directive NIS&nbsp;2&nbsp;:
                  <ul>
                    <li>
                      <a href="/directive">
                        Une page d’information générale sur la directive
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
                  L’ensemble de ces contenus seront mis à jour au fur et à
                  mesure de l’avancement de la transposition de la directive
                  NIS&nbsp;2 en droit français.
                </p>
              </BlocPrincipal>

              <BlocPrincipal
                id="se-tenir-informes"
                className="fond-blanc fr-pt-0"
              >
                <h3>Se tenir informés</h3>
                <p>
                  Consciente de l’importance de pouvoir tenir informées les
                  entités concernées par la directive NIS&nbsp;2, l’ANSSI
                  propose la souscription à une lettre d’information dédiée à
                  NIS&nbsp;2 qui a pour objectifs&nbsp;:
                  <ul className="fr-mb-5v">
                    <li>
                      de partager régulièrement l’avancement du processus de
                      transposition nationale
                    </li>
                    <li>d’aborder certaines thématiques métier </li>
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
                    S’inscrire à l’infolettre
                  </a>
                </p>
              </BlocPrincipal>

              <BlocPrincipal
                id="determiner-si-concernee-par-nis2"
                className="fond-blanc fr-pt-0"
              >
                <h3>
                  Déterminer si votre entité est concernée par la directive
                  NIS&nbsp;2
                </h3>

                <p>
                  Le simulateur mis à disposition par l’ANSSI propose un
                  parcours simple et rapide permettant d’avoir une première
                  indication sur le potentiel statut essentiel ou important de
                  votre entité. Nous vous conseillons donc, dans le cas où le
                  statut de votre entité vis-à-vis de la directive NIS&nbsp;2 ne
                  serait pas encore déterminé, de réaliser le parcours proposé
                  par le simulateur.
                </p>
                <p>
                  Quelques conseils pour une meilleure utilisation de ce
                  simulateur&nbsp;:
                  <ul>
                    <li>
                      Il est préférable d’associer des compétences juridiques à
                      la démarche d’auto-évaluation du statut de l’entité afin
                      de déterminer si celle-ci entre dans le périmètre des
                      entités régulées par la directive NIS&nbsp;2.
                    </li>
                    <li>
                      Il a été observé que certaines entités, lors de leur
                      utilisation du simulateur, confondent le secteur de
                      réalisation de leurs propres activités avec le secteur
                      d’activité des clients qu’elles fournissent ou dont elles
                      sont les sous-traitants. Une telle confusion fausse les
                      résultats du test. Les entités utilisant le simulateur
                      sont donc invitées à renseigner les différentes rubriques
                      avec le plus grand soin.
                    </li>
                    <ul>
                      <li>
                        À titre d’exemple, un fournisseur de turbine d’éolienne,
                        pouvant se considérer comme étant du secteur
                        «&nbsp;Énergie&nbsp;», sera en réalité associé au
                        secteur «&nbsp;Fabrication&nbsp;» (correspondant à
                        l’industrie manufacturière) selon le prisme établi par
                        la directive NIS&nbsp;2.
                      </li>
                      <li>
                        Les entités du secteur de l’industrie manufacturière
                        sont invitées à consulter avec attention le secteur
                        «&nbsp;Fabrication&nbsp;» de ce simulateur, qui regroupe
                        plus de 500 activités distinctes.
                      </li>
                    </ul>
                  </ul>
                  En tout état de cause, recourir au simulateur, dont le
                  résultat est dépendant de l’exactitude des données fournies en
                  entrée, ne dispense pas d’une analyse au vu des textes en
                  vigueur et des circonstances propres à chaque entité.
                </p>
                <a className="fr-nis2-bouton-principal" href="/simulateur">
                  Accéder au simulateur
                </a>
              </BlocPrincipal>

              <BlocPrincipal
                id="identifier-un-responsable"
                className="fond-blanc fr-pt-0"
              >
                <h3>Identifier un responsable en charge de NIS&nbsp;2</h3>
                <p>
                  Une fois votre inclusion dans le périmètre déterminée, nous
                  conseillons aux entités d’identifier une personne qui prendra
                  en charge le projet de mise en œuvre des obligations liées à
                  la réglementation NIS&nbsp;2 et du maintien dans le temps du
                  niveau de sécurité numérique de votre entité.
                </p>
              </BlocPrincipal>
              <BlocPrincipal
                id="se-pre-enregistrer"
                className="fond-blanc fr-pt-0"
              >
                <h3>Se pré-enregistrer</h3>
                <p>
                  En attendant l’entrée en vigueur de l’obligation
                  d’enregistrement, qui interviendra avec la publication des
                  textes réglementaires, l’ANSSI mettra à disposition très
                  prochainement une première version du service d’enregistrement
                  pour permettre aux entités d’anticiper cette étape. Le service
                  prévoit un parcours guidé pour répondre aux attentes de la
                  directive et inclut des saisies automatiques dans la mesure du
                  possible.
                </p>
                <p>
                  Le lien vers le service de pré-enregistrement sera accessible
                  depuis le site MonEspaceNIS2.
                </p>
              </BlocPrincipal>
              <BlocPrincipal
                id="lister-les-systemes-d-information-de-votre-entite"
                className="fond-blanc fr-pt-0"
              >
                <h3>Lister les systèmes d’information de votre entité</h3>
                <p>
                  La directive NIS&nbsp;2 impose de maîtriser ses risques cyber
                  sur l’ensemble de ses systèmes d’information, y compris les
                  systèmes d’information qui sont tout ou partie externalisés.
                </p>
                <p>
                  Aussi, en attendant la publication des exigences de sécurité à
                  atteindre, nous conseillons aux entités d’élaborer (ou de
                  mettre à jour) la liste de leurs systèmes d’information. Cette
                  liste, intitulée « cartographie des systèmes d’information »
                  constituera un élément de base pour les travaux de mise en
                  œuvre à venir.
                </p>
                <p>
                  Elle permettra de&nbsp;:
                  <ul>
                    <li>
                      délimiter le périmètre des travaux de mise en œuvre des
                      exigences de sécurité
                    </li>
                    <li>
                      identifier les systèmes les plus critiques pour l’entité
                    </li>
                    <li>
                      identifier les systèmes les plus vulnérables (en fonction
                      de leur exposition à Internet par exemple)
                    </li>
                  </ul>
                </p>
                <p>
                  La question 1 du&nbsp;
                  <a
                    href="https://cyber.gouv.fr/publications/la-cybersecurite-pour-les-tpepme-en-treize-questions"
                    target="_blank"
                    rel="noreferrer"
                  >
                    guide «&nbsp;La cybersécurité pour les TPE/PME en treize
                    questions&nbsp;»
                  </a>
                  &nbsp; et le&nbsp;
                  <a
                    href="https://cyber.gouv.fr/publications/cartographie-du-systeme-dinformation"
                    target="_blank"
                    rel="noreferrer"
                  >
                    guide pour réaliser la cartographie des systèmes
                    d’information
                  </a>
                  &nbsp; de l’ANSSI peuvent accompagner les entités à cette fin.
                </p>
              </BlocPrincipal>

              <BlocPrincipal id="s-organiser" className="fond-blanc fr-pt-0">
                <h3>
                  S’organiser pour être en mesure de déclarer des incidents
                  importants
                </h3>
                <p>
                  Les entités devront également être en mesure de remplir
                  l’obligation de déclaration d’incidents importants dès la
                  promulgation des textes législatifs et réglementaires. <br />
                  La directive impose notamment que celle-ci soit effectuée
                  auprès de l’autorité nationale compétente par l’entité
                  essentielle ou importante victime de cet incident, sans retard
                  injustifié ou dans les 24 heures après avoir eu connaissance
                  de l’incident important (cf. partie 4.2.3 de ce document).{" "}
                </p>
                <p>
                  Il n’est pas nécessaire d’attendre l’entrée en vigueur des
                  obligations pour déclarer à l’ANSSI ses incidents. Les entités
                  sont invitées à le faire dès à présent sur&nbsp;
                  <a
                    href="https://club.ssi.gouv.fr/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ClubSSI
                  </a>
                  &nbsp;afin de bénéficier d’un accompagnement à la remédiation
                  le cas échéant.
                </p>
              </BlocPrincipal>

              <BlocPrincipal id="demarrer" className="fond-blanc fr-pt-0">
                <h3>Démarrer des premières actions de sécurisation</h3>
                <p>
                  En attendant de connaître l’ensemble des obligations
                  NIS&nbsp;2 qui s’appliqueront, l’ANSSI conseille aux entités
                  essentielles et importantes de se référer aux bonnes pratiques
                  de sécurité numérique&nbsp;:
                  <ul>
                    <li>
                      Pour les entités qui seront entités importantes, en
                      particulier pour les moyennes entreprises, le &nbsp;
                      <a
                        href="https://cyber.gouv.fr/publications/la-cybersecurite-pour-les-tpepme-en-treize-questions"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Guide des TPE/PME
                      </a>
                      &nbsp; constitue une première base de travail pour mettre
                      en œuvre des mesures concrètes et pérennes. <br />
                      Par ailleurs, l’outil&nbsp;
                      <a
                        href="https://monaide.cyber.gouv.fr"
                        target="_blank"
                        rel="noreferrer"
                      >
                        MonAideCyber
                      </a>
                      &nbsp; peut d’ores et déjà être utilisé pour amorcer une
                      première étape de sécurisation cyber.
                    </li>
                    <li>
                      Pour les entités essentielles selon la directive
                      NIS&nbsp;2, le&nbsp;
                      <a
                        href="https://cyber.gouv.fr/publications/guide-dhygiene-informatique"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Guide d’hygiène d’informatique
                      </a>
                      &nbsp; contient une liste de mesures dont il est possible
                      de consulter les grandes thématiques, pour se les
                      approprier et réfléchir à une organisation en lien avec
                      ces dernières. Plus largement, le référentiel de mesures
                      de sécurité prévu pour NIS&nbsp;1 reste une source
                      d’informations significatives pour la sécurisation des
                      systèmes d’information.
                    </li>
                  </ul>
                </p>
                <p>
                  Enfin, pour les entités déjà désignées opérateurs de services
                  essentiels au titre de NIS&nbsp;1, il est nécessaire de ne pas
                  relâcher les efforts. D’ici à l’entrée en vigueur de
                  NIS&nbsp;2, les exigences de NIS&nbsp;1 demeurent applicables.
                  En outre, les futures exigences de la directive NIS&nbsp;2 une
                  fois transposée dans le droit national, s’inscriront dans le
                  prolongement naturel des efforts de NIS&nbsp;1. Tous les
                  travaux d’ores et déjà entrepris par les opérateurs seront
                  valorisables pour NIS&nbsp;2. L’ANSSI a en particulier
                  identifié cette continuité comme une priorité de la
                  transposition de la directive NIS&nbsp;2.
                </p>
                <p>
                  Pour accompagner le renforcement de la cybersécurité des
                  entités,&nbsp;
                  <a
                    href="https://messervices.cyber.gouv.fr"
                    target="_blank"
                    rel="noreferrer"
                  >
                    MesServicesCyber, la plateforme de l’offre de services de
                    l’ANSSI
                  </a>
                  &nbsp;, permet d’accéder à l’ensemble des services et
                  ressources proposés par l’Agence, en réponse à leurs besoins.
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
