import { Button } from "@codegouvfr/react-dsfr/Button";
import { DefaultComponent } from "../../Services/Props.ts";
import FondEuLogo from "../../assets/EU-logo.svg";
import ObligationNotifier from "../../assets/obligation-notifier.svg";
import ObligationMesuresSecurite from "../../assets/obligation-mesures-securite.svg";
import ObligationMaj from "../../assets/obligation-maj.svg";
import ObligationIncidents from "../../assets/obligation-incidents.svg";
import { fr } from "@codegouvfr/react-dsfr";
import styled from "@emotion/styled";
import { UppercaseH2 } from "../Styled/UppercaseH2.tsx";

const ElementObligation = ({
  imageSrc,
  title,
}: {
  imageSrc: string;
  title: string;
}) => {
  return (
    <li className="fr-col">
      <img src={imageSrc} alt={title} />
      <p className="fr-text--lead">{title}</p>
    </li>
  );
};

const MiseEnAvantFaits = styled.span`
  background-color: #fceeac;
  width: fit-content;
`;

const LogoUnionEuropeenneNIS2 = () => {
  const Centered = styled.div`
    text-align: center;

    .interieur-logo-ue {
      background-image: url(${FondEuLogo});
      background-position: center;
      background-repeat: no-repeat;
      width: 486px;
      height: 399px;
      align-items: center;
      vertical-align: middle;
      text-align: center;
      display: flex;
    }

    .interieur-logo-ue p {
      width: 100%;
      margin-bottom: 0;
      left: 205px;
      top: 180px;
    }
  `;

  return (
    <Centered className="fr-col-5">
      <div className="fr-col--middle interieur-logo-ue">
        <p className="fr-h2">NIS&nbsp;2</p>
      </div>
      <p className="fr-definition fr-text--bold fr-mb-0">
        NIS : Network and and Information Security
      </p>
      <p className="fr-definition fr-text--bold fr-mb-0">
        SRI : Sécurité des Réseau et de l’Information
      </p>
    </Centered>
  );
};

const Obligations = styled.div`
  padding-top: ${fr.spacing("8v")};
  margin-top: ${fr.spacing("7w")};
  border: 2px solid
    ${
      fr.colors.decisions.border.plain.grey.default // TODO was #2F3A43
    };

  & .traversant {
    margin-top: -${fr.spacing("12v")};
    align-content: center;
    width: 100%;
  }

  & h3 {
    background-color: white;
    width: fit-content;
    text-align: center;
    padding: 0 ${fr.spacing("3w")};
    margin-left: auto;
    margin-right: auto;
  }

  & li {
    list-style: none;
    text-align: center;
  }

  & img {
    float: none;
  }
`;

const BandeauNis2EU: DefaultComponent = () => {
  return (
    <>
      <div className="fr-pb-13w">
        <div className="fr-container">
          <div className="fr-grid-row--center fr-pt-10w fr-pb-5w">
            <UppercaseH2 className="fr-h1">
              NIS2, la nouvelle directive <br />
              européenne cyber
            </UppercaseH2>
          </div>
          <div className="fr-grid-row fr-pb-4w">
            <div className="fr-col">
              <div>
                <p className="fr-h4 fr-mb-4w">
                  En France, le nombre d&apos;intrusions avérées dans
                  <br />
                  des systèmes d&apos;information signalées à l&apos;ANSSI
                  <br />
                  <MiseEnAvantFaits className="fr-h4">
                    a augmenté de 37% entre 2020 et 2021.
                  </MiseEnAvantFaits>
                </p>
              </div>
              <p className="fr-text--lead fr-mb-4w">
                Plusieurs milliers d’entreprises et d’administrations publiques
                françaises seront soumises aux exigences de la nouvelle
                directive européenne sur la sécurité des réseaux et des systèmes
                d’information ou « directive NIS2 » afin de renforcer leur
                cybersécurité et harmoniser les pratiques à l’échelle
                européenne.
              </p>
              {/* TODO: padding was "6px, 24px, 10px, 18px" */}
              <Button
                priority="secondary"
                linkProps={{
                  href: "https://www.ssi.gouv.fr/directive-nis-2/",
                  title:
                    "Foire Aux Questions à propos de NIS 2 sur le site de l'ANSSI",
                  target: "_blank",
                }}
                iconId={"fr-icon-question-line"}
              >
                Voir les FAQ
              </Button>
              <Button
                priority="secondary"
                linkProps={{
                  href: "https://eur-lex.europa.eu/legal-content/FR/TXT/PDF/?uri=CELEX:32022L2555",
                  title:
                    "DIRECTIVE (UE) 2022/2555 DU PARLEMENT EUROPÉEN ET DU CONSEIL \n" +
                    "du 14 décembre 2022",
                  target: "_blank",
                }}
                iconId={"fr-icon-external-link-line"}
                className="fr-ml-2w"
              >
                Voir la directive complète
              </Button>
            </div>
            <LogoUnionEuropeenneNIS2 />
          </div>
          <Obligations className="fr-pt-4w">
            <div className="fr-col--middle traversant">
              {/* TODO: utiliser mise en avant adéquate */}
              <h3 className="fr-h4">
                Les entités concernées devront se conformer à certaines
                obligations auprès de l’ANSSI
              </h3>
            </div>
            <ul className="fr-grid-row">
              {/* TODO: améliorer les tiles/cards des obligations */}
              <ElementObligation
                title="S’enregistrer auprès de l'ANSSI"
                imageSrc={ObligationNotifier}
              />
              <ElementObligation
                title="Mettre en œuvre des mesures de sécurité"
                imageSrc={ObligationMesuresSecurite}
              />
              <ElementObligation
                title="Mettre à jour ses systèmes d'information"
                imageSrc={ObligationMaj}
              />
              <ElementObligation
                title="Déclarer les incidents de sécurité"
                imageSrc={ObligationIncidents}
              />
            </ul>
          </Obligations>
        </div>
      </div>
    </>
  );
};

export default BandeauNis2EU;
