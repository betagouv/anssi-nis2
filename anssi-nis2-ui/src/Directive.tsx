import "@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";
import "@gouvfr/dsfr/dist/utility/utility.css";

import "./style/directive.scss";
import "./style/directive.tablette.scss";
import "./style/directive.desktop.scss";
import Hero from "../src/assets/directive-hero.svg";
import DirecteurANSSI from "../src/assets/Directeur ANSSI.png";
import CollectivitesTerritoriales from "../src/assets/collectivites-territoriales.svg";
import AdministrationsPubliques from "../src/assets/administrations-publiques.svg";
import MoyennesEntreprises from "../src/assets/moyennes-entreprises.svg";
import GrandesEntreprises from "../src/assets/grandes-entreprises.svg";
import Demarche from "../src/assets/demarche.svg";
import DirectiveIntegrale from "../src/assets/en-savoir-plus/directive.svg";
import Presentation from "../src/assets/en-savoir-plus/presentation.svg";
import FAQ from "../src/assets/en-savoir-plus/faq.svg";

import { DefaultComponent } from "./Services/Props";
import MiseEnPage from "./Components/MiseEnPage.tsx";
import { CarteEntite } from "./Components/Directive/CarteEntite.tsx";
import { SecteurActivite } from "./Components/Directive/SecteurActivite.tsx";
import { ListeSecteursConcernes } from "./Components/Directive/ListeSecteursConcernes.tsx";
import { CarteInformation } from "./Components/Directive/CarteInformation.tsx";
import { CarteEnSavoirPlus } from "./Components/Directive/CarteEnSavoirPlus.tsx";
import { MenuMobile } from "./Components/MenuMobile.tsx";
import { Sommaire } from "./Components/Directive/Sommaire.tsx";
import { MenuDesktop } from "./Components/MenuDesktop.tsx";
import BlocPrincipal from "./Components/BlocPrincipal.tsx";

const Directive: DefaultComponent = () => {
  return (
    <>
      <MiseEnPage page="Directive NIS 2">
        <MenuMobile />
        <MenuDesktop />
        <div className="fr-nis2-directive">
          <BlocPrincipal className="fond-primaire" id="hero">
            <h1 className="texte-blanc">
              M&apos;informer sur la directive NIS&nbsp;2
            </h1>
            <img src={Hero} alt="Illustration du Hero de la directive NIS 2" />
          </BlocPrincipal>
          <div className="page">
            <Sommaire />
            <div className="contenu-page">
              <BlocPrincipal className="fond-blanc aucune-marge-basse">
                <h2 className="texte-primaire">
                  La directive NIS&nbsp;2 en synthèse
                </h2>
                <div id="mot-du-directeur">
                  <h3>Le mot du directeur général</h3>
                  <p>
                    La directive NIS&nbsp;2 permet d&apos;élever le niveau
                    global de cybersécurité par l&apos;application de règles
                    harmonisées et simplifiées.
                  </p>
                  <p>
                    Face à une cybermenace qui s&apos;accroît, NIS&nbsp;2 relève
                    le défi d&apos;une meilleure sécurisation des tissus
                    économique et administratif de la France.
                  </p>
                  <p>
                    Les exigences prévues par la directive européenne invitent
                    de nombreuses entités à construire une solide feuille de
                    route pour déployer et renforcer leurs moyens de
                    cyberdéfense, avec pour objectifs un fonctionnement
                    structurel plus sûr, davantage de confiance vis-à-vis de
                    leurs parties prenantes et une meilleure compétitivité pour
                    les entreprises.
                  </p>
                  <p>
                    À terme, et de concert avec les autres États membres de
                    l&apos;Union européenne (UE), c&apos;est une maturité cyber
                    à l&apos;échelon européen que nous voulons atteindre.
                  </p>
                  <figure>
                    <img
                      src={DirecteurANSSI}
                      alt="Directeur Général de l'ANSSI"
                      width={88}
                    />
                    <figcaption>
                      <p>Vincent Strubel</p>
                      <p>Directeur Général de l&apos;ANSSI</p>
                    </figcaption>
                  </figure>
                </div>
              </BlocPrincipal>
              <BlocPrincipal
                id="explication-nis2"
                className="fond-blanc aucune-marge-basse"
              >
                <h3>Qu&apos;est-ce que NIS&nbsp;2 ?</h3>
                <div>
                  <p>
                    La directive NIS&nbsp;2 (en français : sécurité des réseaux
                    et des systèmes d&apos;Information) vise à renforcer le
                    niveau de cybersécurité des tissus économique et
                    administratif des pays membres de l&apos;UE.
                  </p>
                  <p>
                    L&apos;enjeu est de mieux protéger les réseaux et les
                    systèmes d&apos;information servant à fournir des services
                    essentiels dans les secteurs clés de nos sociétés. Alors que
                    la première directive NIS visait à protéger les acteurs
                    économiques majeurs de l&apos;UE, cette nouvelle directive
                    élargit le champ des entités et secteurs concernés et
                    introduit des exigences plus adaptées, notamment au regard
                    du renforcement de la menace cyber. Elle prévoit un socle de
                    mesures juridiques, techniques et organisationnelles que les
                    futures entités régulées devront mettre en œuvre, en
                    fonction du risque existant, afin d&apos;élever leur niveau
                    général de cybersécurité et d&apos;accroître leur résilience
                    opérationnelle.
                  </p>
                  <p>
                    L&apos;ANSSI, en tant qu&apos;autorité nationale en matière
                    de cybersécurité et de cyberdéfense, pilote la transposition
                    en droit national de la directive et assure sa mise en
                    œuvre.
                  </p>
                  <p>
                    La transposition de la directive a démarré par une phase de
                    préparation du projet de loi, qui a été présenté en Conseil
                    des Ministres le 15 octobre 2024 et déposé au Parlement en
                    vue de son adoption dans les prochains mois. Consulter le
                    dossier législatif contenant le projet de loi sur le site
                    Légifrance :{" "}
                    <a
                      href="https://www.legifrance.gouv.fr/dossierlegislatif/JORFDOLE000050349138/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Projet de Loi relatif à la résilience des infrastructures
                      critiques et au renforcement de la cybersécurité
                      (PRMD2412608L)
                    </a>
                    . Dans les mois suivants la promulgation de la loi, la
                    transposition se poursuivra par la phase de production des
                    décrets et arrêtés. NIS&nbsp;2 entrera en vigueur en France
                    dès lors que l&apos;ensemble des textes de transposition
                    (loi, décrets, arrêtés) auront été promulgués. Il est utile
                    de préciser que la date d&apos;entrée en vigueur ne
                    correspond pas à la date d&apos;application de
                    l&apos;ensemble des exigences réglementaires qui seront
                    imposées aux entités régulées.
                  </p>
                </div>
              </BlocPrincipal>
              <BlocPrincipal
                id="entites"
                className="fond-blanc aucune-marge-basse"
              >
                <h3>
                  Les entités essentielles (EE) et entités importantes (EI)
                </h3>
                <p>
                  Pour garantir une proportionnalité de traitement, la directive
                  NIS&nbsp;2 distingue deux catégories d&apos;entités régulées :
                </p>
                <div className="conteneur-cartes">
                  <CarteEntite titre="EE" contenu="Entités essentielles" />
                  <CarteEntite titre="EI" contenu="Entités importantes" />
                </div>
                <p>
                  Cette catégorisation s&apos;établit selon leur degré de
                  criticité, leur taille et leur chiffre d&apos;affaires (pour
                  les entreprises).
                </p>
                <p>
                  La règlementation s&apos;appuiera sur ces deux typologies
                  d&apos;entités (EE ou EI) pour définir des objectifs adaptés
                  et proportionnés aux enjeux de chacune de ces catégories.
                </p>
                <CarteInformation
                  contenu={[
                    "Les mécaniques d'identification des entités concernées par la directive NIS 2 seront précisées au travers du processus de transposition de la directive en droit national. L'ANSSI communiquera dès que possible les éléments correspondants.",
                  ]}
                />
              </BlocPrincipal>
              <BlocPrincipal
                id="secteurs-activite"
                className="fond-blanc aucune-marge-basse"
              >
                <h3>
                  Plusieurs milliers d&apos;entités concernées sur 18 secteurs
                  d&apos;activité
                </h3>
                <div className="conteneur-secteurs-activites">
                  <SecteurActivite
                    image={CollectivitesTerritoriales}
                    titre="Collectivités territoriales"
                  />
                  <SecteurActivite
                    image={AdministrationsPubliques}
                    titre="Administrations publiques"
                  />
                  <SecteurActivite
                    image={MoyennesEntreprises}
                    titre="Moyennes entreprises"
                  />
                  <SecteurActivite
                    image={GrandesEntreprises}
                    titre="Grandes entreprises"
                  />
                </div>
              </BlocPrincipal>
              <BlocPrincipal
                id="secteurs-concernes"
                className="fond-blanc aucune-marge-basse"
              >
                <h3>Les secteurs concernés</h3>
                <ListeSecteursConcernes />
              </BlocPrincipal>
              <BlocPrincipal
                id="obligations"
                className="fond-blanc aucune-marge-basse"
              >
                <h3>Quelles obligations pour les entités ?</h3>
                <h4>Le partage d&apos;informations</h4>
                <p>
                  Les entités seront tenues de fournir un certain nombre
                  d&apos;informations à l&apos;autorité nationale désignée et de
                  les mettre à jour.
                </p>
                <h4>La gestion des risques cyber</h4>
                <p>
                  La mise en place de mesures adaptées : les entités devront
                  mettre en place des mesures juridiques, techniques et
                  organisationnelles pour gérer les risques qui menacent la
                  sécurité de leurs réseaux et de leurs systèmes
                  d&apos;information.
                </p>
                <h4>La déclaration d&apos;incidents</h4>
                <p>
                  Les entités devront signaler à l&apos;autorité nationale
                  désignée leurs incidents de sécurité ayant un impact important
                  et fournir des rapports concernant l&apos;évolution de la
                  situation.
                </p>
                <CarteInformation
                  contenu={[
                    "Conformément à la directive NIS 2, des actions de supervision seront assurées pour vérifier le respect par les entités de leurs obligations. En cas de non-respect de ces dernières, les entités s'exposeront à des sanctions.",
                    "La directive prévoit la capacité d'imposer, entre autres, des sanctions financières aux entités régulées. Ces sanctions, qui doivent être proportionnées au(x) manquement(s), pourront aller jusqu'à un pourcentage du chiffre d'affaires mondial des entités (2% pour les EE et 1,4% pour les EI).",
                  ]}
                />
              </BlocPrincipal>
              <BlocPrincipal id="demarche" className="fond-blanc">
                <h3>L&apos;ANSSI vous accompagne dans cette démarche</h3>
                <p>
                  Animée par une volonté forte de co-construire le dispositif
                  national avec l&apos;ensemble des acteurs régulés, des
                  consultations avec les fédérations professionnelles, les
                  associations d&apos;élus locaux et les ministères concernés
                  par NIS&nbsp;2 sont en cours depuis l&apos;automne 2023 afin
                  d&apos;échanger avec les représentants des futures entités
                  régulées. Ces consultations se poursuivront tout au long des
                  travaux de transposition.
                </p>
                <p>
                  En parallèle, l&apos;ANSSI développe de nouveaux outils, avec
                  notamment la création du service numérique « MonEspaceNIS2 »
                  dont la vocation est d&apos;accompagner les entités régulées
                  dans leur mise en conformité à la directive. Ce service
                  s&apos;étoffera au fil du temps pour proposer des services
                  pertinents pour les entités. L&apos;ANSSI souhaite capitaliser
                  sur ses actions historiques de conseil, de sensibilisation et
                  d&apos;assistance opérationnelle.
                </p>
                <div className="conteneur-image">
                  <img
                    src={Demarche}
                    alt="Accompagnement dans cette démarche"
                  />
                </div>
                <a href="#hero">Haut de page</a>
              </BlocPrincipal>
              <BlocPrincipal id="en-savoir-plus" className="fond-blanc">
                <h3>En savoir plus</h3>
                <p>
                  Retrouvez ci-dessous les éléments de contexte pour comprendre
                  plus en détail les enjeux et modalités de la directive.
                </p>
                <div className="conteneur-cartes-en-savoir-plus">
                  <CarteEnSavoirPlus
                    image={DirectiveIntegrale}
                    titre="Afficher la directive dans son intégralité"
                    lien="https://eur-lex.europa.eu/legal-content/FR/TXT/PDF/?uri=CELEX:32022L2555"
                  />
                  <CarteEnSavoirPlus
                    image={Presentation}
                    titre="Découvrir la directive en vidéo"
                    lien="https://cyber.gouv.fr/directive-nis-2"
                  />
                  <CarteEnSavoirPlus
                    image={FAQ}
                    titre="Trouver les réponses à vos questions dans la FAQ"
                    lien="https://aide.monespacenis2.cyber.gouv.fr"
                  />
                  <CarteEnSavoirPlus
                    image={Presentation}
                    titre="Visionner le bilan des consultations des écosystèmes sectoriels"
                    lien="https://www.dailymotion.com/video/k3s6qjVAhdBHtaAKAGe"
                  />
                  <CarteEnSavoirPlus
                    image={DirectiveIntegrale}
                    titre="Télécharger la plaquette d'informations NIS 2"
                    lien="/statique/Plaquette_NIS2_2024.pdf"
                  />
                  <CarteEnSavoirPlus
                    image={DirectiveIntegrale}
                    titre="Download NIS&nbsp;2's information booklet"
                    lien="/statique/Plaquette_NIS2_2024_English.pdf"
                  />
                  <CarteEnSavoirPlus
                    image={DirectiveIntegrale}
                    titre="Consulter le dossier législatif contenant le projet de loi transposant la directive NIS&nbsp;2"
                    lien="https://www.legifrance.gouv.fr/dossierlegislatif/JORFDOLE000050349138/"
                  />
                </div>
              </BlocPrincipal>
            </div>
          </div>
        </div>
      </MiseEnPage>
    </>
  );
};

export default Directive;
