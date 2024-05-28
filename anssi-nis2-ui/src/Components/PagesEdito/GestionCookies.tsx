import { DefaultComponent } from "../../Services/Props";
import { MatomoOptOut } from "../Matomo/MatomoOptOut";

const GestionCookies: DefaultComponent = () => {
  return (
    <>
      <h3>Cookies déposés et opt-out</h3>
      <p>
        Ce site dépose un petit fichier texte (un « cookie ») sur votre
        ordinateur lorsque vous le consultez. Cela nous permet de mesurer le
        nombre de visites et de comprendre quelles sont les pages les plus
        consultées.
      </p>
      <h3>
        Ce site n’affiche pas de bannière de consentement aux cookies,
        pourquoi&nbsp;?
      </h3>
      <p>
        C’est vrai, vous n’avez pas eu à cliquer sur un bloc qui recouvre la
        moitié de la page pour dire que vous êtes d’accord avec le dépôt de
        cookies — même si vous ne savez pas ce que ça veut dire !
      </p>
      <p>
        Rien d’exceptionnel, pas de passe-droit lié à un .gouv.fr. Nous
        respectons simplement la loi, qui dit que certains outils de suivi
        d’audience, correctement configurés pour respecter la vie privée, sont
        exemptés d’autorisation préalable.
      </p>
      <p>
        Nous utilisons pour cela <a href="https://matomo.org/">Matomo</a>, un
        outil <a href="https://matomo.org/free-software/">libre</a>, paramétré
        pour être en conformité avec la{" "}
        <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience">
          recommandation « Cookies »
        </a>{" "}
        de la CNIL. Cela signifie que votre adresse IP, par exemple, est
        anonymisée avant d’être enregistrée. Il est donc impossible d’associer
        vos visites sur ce site à votre personne.
      </p>
      <MatomoOptOut />
      <h3>Je contribue à enrichir vos données, puis-je y accéder&nbsp;?</h3>
      <p>
        Bien sûr ! Les statistiques d’usage de la majorité de nos produits, dont
        beta.gouv.fr, sont disponibles en accès libre sur{" "}
        <a href="https://stats.data.gouv.fr/">stats.data.gouv.fr</a>.
      </p>
    </>
  );
};

export default GestionCookies;
