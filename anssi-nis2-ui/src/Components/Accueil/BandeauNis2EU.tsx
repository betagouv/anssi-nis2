import { Button } from "@codegouvfr/react-dsfr/Button";
import { DefaultComponent } from "../../Services/Props.ts";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.ts";
import FondEuLogo from "../../assets/EU-logo.svg";
import ObligationNotifier from "../../assets/obligation-notifier.svg";
import ObligationMesuresSecurite from "../../assets/obligation-mesures-securite.svg";
import ObligationMaj from "../../assets/obligation-maj.svg";
import ObligationIncidents from "../../assets/obligation-incidents.svg";
import { fr } from "@codegouvfr/react-dsfr";
import styled from "@emotion/styled";
import { UppercaseH2 } from "../Styled/UppercaseH2.tsx";

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
      display: flex;
    }

    /* TODO : trouver une meilleure manière de positionner le texte du logo */

    .interieur-logo-ue p {
      position: relative;
      left: 50%;
      margin-left: -2.3rem;
    }
  `;

  return (
    <Centered className="fr-col-5">
      <div className="fr-col--middle interieur-logo-ue">
        <p className="fr-h2">NIS2</p>
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

// TODO bordure autour, pas en travers du titre pour le haut. Espacement à revoir
const Obligations = styled.div`
  padding-top: ${fr.spacing("8v")};
  border: 2px solid
    ${
      fr.colors.decisions.border.plain.grey.default // TODO was #2F3A43
    };

  & h3 {
    text-align: center;
  }

  & li {
    list-style: none;
    text-align: center;
  }

  & img {
    float: none;
  }
`;

const ElementObligation = (props: { imageSrc: string; title: string }) => {
  const { imageSrc, title } = props;

  return (
    <>
      <li className="fr-col">
        <img src={imageSrc} alt={title} />
        <p className="fr-text--lead">{title}</p>
      </li>
    </>
  );
};

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
                onClick={noRefClick}
                iconId={"fr-icon-question-line"}
              >
                Voir les FAQ
              </Button>
            </div>
            <LogoUnionEuropeenneNIS2 />
          </div>
          <Obligations className="fr-pt-4w">
            <div className="fr-col--middle">
              {/* TODO: utiliser mise en avant adéquate */}
              <h3 className="fr-h4">
                Les entités concernées devront se conformer à certaines
                obligations auprès de l’ANSSI
              </h3>
            </div>
            <ul className="fr-grid-row">
              {/* TODO: améliorer les tiles/cards des obligations */}
              <ElementObligation
                title="Se notifier à l'ANSSI"
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
                title="Notifier les incidents de sécurité"
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
