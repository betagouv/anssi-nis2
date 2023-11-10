import { Button } from "@codegouvfr/react-dsfr/Button";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import AnssiLogo from "../../assets/ANSSI-180.svg";

const BandeauQuiEstANSSI = () => (
  <>
    <div className="fr-nis2-qui-est-anssi fr-pt-10w fr-pb-13w">
      <div className={"fr-container"}>
        <div className="fr-grid-row--center">
          <h2 className="fr-mb-7w">Qui est l’ANSSI ?</h2>
          <img src={AnssiLogo} alt="Logo ANSSI" className="fr-mb-7w" />
          <div className="fr-col-8 fr-col-offset-2 fr-px-2w">
            <p className="fr-text--lead fr-mb-4w">
              L’Agence Nationale de la Sécurité des Systèmes d’Information
              assure la sécurité numérique de l’État, mais{" "}
              <span className="fr-text--bold">
                elle est aussi chargée d’une mission de conseil et de soutien
                aux administrations et aux opérateurs d’importance vitale.
              </span>
            </p>
            <Button
              iconId="fr-icon-external-link-line"
              onClick={noRefClick}
              priority={"secondary"}
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default BandeauQuiEstANSSI;
