import { Button } from "@codegouvfr/react-dsfr/Button";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import AnssiLogo from "../../assets/ANSSI-180.svg";
import { liens } from "../../References/liens.tsx";

const BandeauQuiEstANSSI = () => (
  <>
    <div className="fr-nis2-qui-est-anssi fr-pt-10w fr-pb-13w">
      <div className={"fr-container"}>
        <div className="fr-grid-row--center">
          <h2 className="fr-mb-7w">Qui est l’ANSSI ?</h2>
          <img src={AnssiLogo} alt="Logo ANSSI" className="fr-mb-6w" />
          <div className="fr-col-8 fr-col-offset-2">
            <p className="fr-text--lead fr-mb-2w">
              Créée en 2009, l’Agence nationale de la sécurité des systèmes
              d’information (ANSSI) est l’autorité nationale en matière de
              cybersécurité et de cyberdéfense.
            </p>
            <p className="fr-text--lead fr-text--bold fr-mb-4w">
              Son action pour la protection de la Nation face aux cyberattaques
              se traduit en quatre grandes missions : défendre, connaître,
              partager, accompagner.{" "}
            </p>
            <a {...liens.anssi.site}>
              <Button
                iconId="fr-icon-external-link-line"
                onClick={noRefClick}
                priority={"secondary"}
              >
                En savoir plus
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default BandeauQuiEstANSSI;
