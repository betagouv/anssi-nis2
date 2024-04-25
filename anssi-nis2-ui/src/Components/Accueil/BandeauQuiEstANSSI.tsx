import AnssiLogo from "../../assets/ANSSI-180.svg";
import { liens } from "../../References/liens.tsx";
import BlocPrincipal from "../BlocPrincipal.tsx";

const BandeauQuiEstANSSI = () => (
  <BlocPrincipal id="anssi" className="fond-blanc">
    <h2 className="texte-primaire">Qu&apos;est-ce que l&apos;ANSSI ?</h2>
    <div className="conteneur-logo">
      <img src={AnssiLogo} alt="Logo ANSSI" />
    </div>
    <p>
      Créée en 2009, l&apos;Agence nationale de la sécurité des systèmes
      d’information (ANSSI) est l’autorité nationale en matière de cybersécurité
      et de cyberdéfense.
    </p>
    <p>
      <b>
        Son action pour la protection de la Nation face aux cyberattaques se
        traduit en quatre grandes missions : défendre, connaître, partager,
        accompagner.
      </b>
    </p>
    <a {...liens.anssi.site} className="fr-nis2-bouton-secondaire">
      En savoir plus
    </a>
  </BlocPrincipal>
);

export default BandeauQuiEstANSSI;
