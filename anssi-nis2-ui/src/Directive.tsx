import "@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";
import "@gouvfr/dsfr/dist/utility/utility.css";

import "./directive.scss";
import "./directive.tablette.scss";
import "./directive.desktop.scss"
import Hero from "../src/assets/directive-hero.svg";
import DirecteurANSSI from "../src/assets/Directeur ANSSI.png";
import CollectivitesTerritoriales from "../src/assets/collectivites-territoriales.svg";
import AdministrationsPubliques from "../src/assets/administrations-publiques.svg";
import MoyennesEntreprises from "../src/assets/moyennes-entreprises.svg";
import GrandesEntreprises from "../src/assets/grandes-entreprises.svg";
import Demarche from "../src/assets/demarche.svg";
import DirectiveIntegrale from "../src/assets/en-savoir-plus/directive.svg"
import Presentation from "../src/assets/en-savoir-plus/presentation.svg"
import FAQ from "../src/assets/en-savoir-plus/faq.svg"

import { DefaultComponent } from "./Services/Props";
import MiseEnPage from "./Components/MiseEnPage.tsx";
import {CarteEntite} from "./Components/Directive/CarteEntite.tsx";
import {SecteurActivite} from "./Components/Directive/SecteurActivite.tsx";
import {ListeSecteursConcernes} from "./Components/Directive/ListeSecteursConcernes.tsx";
import {CarteInformation} from "./Components/Directive/CarteInformation.tsx";
import {CarteEnSavoirPlus} from "./Components/Directive/CarteEnSavoirPlus.tsx";
import {MenuMobile} from "./Components/MenuMobile.tsx";
import {Sommaire} from "./Components/Directive/Sommaire.tsx";
import {MenuDesktop} from "./Components/MenuDesktop.tsx";
import BlocPrincipal from "./Components/BlocPrincipal.tsx";

const Directive: DefaultComponent = () => {

  return (
    <>
      <MiseEnPage page="Directive NIS 2">
          <MenuMobile />
          <MenuDesktop />
          <div className="fr-nis2-directive">
              <BlocPrincipal className="fond-primaire" id="hero">
                  <h1 className="texte-blanc">M’informer sur la directive NIS 2</h1>
                  <img src={Hero} alt="Illustration du Hero de la directive NIS 2"/>
              </BlocPrincipal>
              <div className="page">
                  <Sommaire />
                  <div className="contenu-page">
                      <BlocPrincipal className="fond-blanc aucune-marge-basse">
                          <h2 className="texte-primaire">La directive NIS 2 en détail</h2>
                          <div id="mot-du-directeur">
                              <h3>Le mot du directeur général</h3>
                              <p>La directive NIS 2 permet d’élever le niveau global de cybersécurité par l’application de
                                  règles harmonisées et simplifiées. </p>
                              <p>Face à une cybermenace qui s’accroît, NIS 2 relève le défi d’une meilleure sécurisation des
                                  tissus économique et administratif de la France.</p>
                              <p>Les exigences prévues par la directive européenne invitent de nombreuses entités à construire
                                  une solide feuille de route pour déployer et renforcer leurs moyens de cyberdéfense, avec pour
                                  objectifs un fonctionnement structurel plus sûr, davantage de confiance vis-à-vis de leurs
                                  parties prenantes et une meilleure compétitivité pour les entreprises.</p>
                              <p>À terme, et de concert avec les autres États membres de l’Union européenne (UE), c’est une
                                  maturité cyber à l’échelon européen que nous voulons atteindre.</p>
                              <figure>
                                  <img src={DirecteurANSSI} alt="Directeur Général de l'ANSSI" width={88}/>
                                  <figcaption>
                                      <p>Vincent Strubel</p>
                                      <p>Directeur Général de l’ANSSI</p>
                                  </figcaption>
                              </figure>
                          </div>
                      </BlocPrincipal>
                      <BlocPrincipal id="explication-nis2" className="fond-blanc aucune-marge-basse">
                          <h3>Qu’est-ce que NIS 2 ?</h3>
                          <div>
                              <p>La directive NIS 2 (Network and Information System Security – en français : sécurité des
                                  réseaux et des systèmes d’Information) vise à renforcer le niveau de cybersécurité des tissus
                                  économique et administratif des pays membres de l’UE.</p>
                              <p>L’enjeu est de mieux protéger les réseaux et les systèmes d’information servant à fournir des
                                  services essentiels dans les secteurs clés de nos sociétés. Alors que la première directive
                                  NIS visait à protéger les acteurs économiques majeurs de l’UE, cette nouvelle directive
                                  élargit le champ des entités et secteurs concernés et introduit des exigences plus adaptées,
                                  notamment au regard du renforcement de la menace cyber. Elle prévoit un socle de mesures
                                  juridiques, techniques et organisationnelles que les futures entités assujetties devront
                                  mettre en œuvre, en fonction du risque existant, afin d’élever leur niveau général de
                                  cybersécurité et d’accroître leur résilience opérationnelle. </p>
                              <p>L’ANSSI, en tant qu’autorité nationale en matière de cybersécurité et de cyberdéfense, pilote
                                  la transposition en droit national de la directive et assure sa mise en œuvre.</p>
                          </div>
                      </BlocPrincipal>
                      <BlocPrincipal id="entites" className="fond-blanc aucune-marge-basse">
                          <h3>Les entités essentielles (EE) et entités importantes (EI)</h3>
                          <p>Pour garantir une proportionnalité de traitement, la directive NIS 2 distingue deux catégories
                              d’entités régulées :</p>
                          <div className="conteneur-cartes">
                              <CarteEntite titre="EE" contenu="Entités essentielles"/>
                              <CarteEntite titre="EI" contenu="Entités importantes"/>
                          </div>
                          <p>Cette catégorisation s’établit selon leur degré de criticité, leur taille et leur chiffre
                              d’affaires (pour les entreprises).</p>
                          <p>La règlementation s’appuiera sur ces deux typologies d’entités (EE ou EI) pour définir des
                              objectifs adaptés et proportionnés aux enjeux de chacune de ces catégories.</p>
                          <CarteInformation contenu={["Les mécaniques d’identification des entités concernées par la directive NIS 2 seront précisées au travers du processus de transposition de la directive en droit national. L’ANSSI communiquera dès que possible les éléments correspondants."]} />
                      </BlocPrincipal>
                      <BlocPrincipal id="secteurs-activite" className="fond-blanc aucune-marge-basse">
                          <h3>+ de 10 000 entités concernées sur 18 secteurs d’activité</h3>
                          <div className="conteneur-secteurs-activites">
                              <SecteurActivite image={CollectivitesTerritoriales} titre="Collectivités territoriales"/>
                              <SecteurActivite image={AdministrationsPubliques} titre="Administrations publiques"/>
                              <SecteurActivite image={MoyennesEntreprises} titre="Moyennes entreprises"/>
                              <SecteurActivite image={GrandesEntreprises} titre="Grandes entreprises"/>
                          </div>
                      </BlocPrincipal>
                      <BlocPrincipal id="secteurs-concernes" className="fond-blanc aucune-marge-basse">
                          <h3>Les secteurs concernés</h3>
                          <ListeSecteursConcernes/>
                      </BlocPrincipal>
                      <BlocPrincipal id="obligations" className="fond-blanc aucune-marge-basse">
                          <h3>Quelles obligations pour les entités ?</h3>
                          <h4>Le partage d’informations</h4>
                          <p>Les entités seront tenues de fournir un certain nombre d’informations à l’ANSSI et de les mettre à jour.</p>
                          <h4>La gestion des risques cyber</h4>
                          <p>La mise en place de mesures adaptées : les entités devront mettre en place des mesures juridiques, techniques et organisationnelles pour gérer les risques qui menacent la sécurité de leurs réseaux et de leurs systèmes d’information.</p>
                          <h4>La déclaration d’incidents</h4>
                          <p>Les entités devront signaler à l’ANSSI leurs incidents de sécurité ayant un impact important et fournir des rapports concernant l’évolution de la situation.</p>
                          <CarteInformation contenu={["Conformément à la directive NIS 2, des actions de supervision seront assurées pour vérifier le respect par les entités de leurs obligations. En cas de non-respect de ces dernières, les entités s’exposeront à des sanctions.", "La directive prévoit la capacité d’imposer, entre autres, des sanctions financières aux entités régulées. Ces sanctions, qui doivent être proportionnées au(x) manquement(s), pourront aller jusqu’à un pourcentage du chiffre d’affaires mondial des entités (2% pour les EE et 1,4% pour les EI)."]} />
                      </BlocPrincipal>
                      <BlocPrincipal id="demarche" className="fond-blanc">
                          <h3>L’ANSSI vous accompagne dans cette démarche</h3>
                          <p>Animée par une volonté forte de co-construire le dispositif national avec l’ensemble des acteurs régulés, des consultations avec les fédérations professionnelles, les associations d’élus locaux et les ministères concernés par NIS 2 sont en cours depuis l’automne 2023 afin d’échanger avec les représentants des futures entités régulées. Ces consultations se poursuivront tout au long des travaux de transposition.</p>
                          <p>En parallèle, l’ANSSI développe de nouveaux outils, avec notamment la création du service numérique « MonEspaceNIS2 » dont la vocation est d’accompagner les assujettis dans leur mise en conformité à la directive. Ce service s’étoffera au fil du temps pour proposer des services pertinents pour les entités. L’ANSSI souhaite capitaliser sur ses actions historiques de conseil, de sensibilisation et d’assistance opérationnelle.</p>
                          <div className="conteneur-image">
                            <img src={Demarche} alt="Accompagnement dans cette démarche" />
                          </div>
                          <a href="#hero">Haut de page</a>
                      </BlocPrincipal>
                      <BlocPrincipal id="en-savoir-plus" className="fond-blanc">
                          <h3>En savoir plus</h3>
                          <p>Retrouvez ci-dessous les éléments de contexte pour comprendre plus en détail les enjeux et modalités de la directive.</p>
                          <div className="conteneur-cartes-en-savoir-plus">
                              <CarteEnSavoirPlus image={DirectiveIntegrale} titre="Afficher la directive dans son intégralité" lien="https://eur-lex.europa.eu/legal-content/FR/TXT/PDF/?uri=CELEX:32022L2555" />
                              <CarteEnSavoirPlus image={Presentation} titre="Découvrir la présentation en vidéo" lien="https://cyber.gouv.fr//directive-nis-2" />
                              <CarteEnSavoirPlus image={FAQ} titre="Trouver les réponses à vos questions dans la FAQ" lien="http://aide.monespacenis2.cyber.gouv.fr" />
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
