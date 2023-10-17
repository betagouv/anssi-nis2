import { Helmet } from "react-helmet";
import { DefaultComponentExtensible, DefaultProps } from "../Services/Props";

type MatomoProps = DefaultProps & {
  SiteId: number;
  JavascriptContainerHash: string;
  GestionBalises?: boolean;
};

const Matomo: DefaultComponentExtensible<MatomoProps> = ({
  JavascriptContainerHash,
  GestionBalises,
}: MatomoProps) => {
  const scriptMatomoGestionBalises = ` var _mtm = window._mtm = window._mtm || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
  (function() {
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://stats.beta.gouv.fr/js/container_${JavascriptContainerHash}.js'; s.parentNode.insertBefore(g,s);
  })();`;
  // const scriptMatomoJavascript = `var _paq = window._paq = window._paq || [];
  // /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  // _paq.push(['trackPageView']);
  // _paq.push(['enableLinkTracking']);
  // (function() {
  //   var u="https://stats.beta.gouv.fr/";
  //   _paq.push(['setTrackerUrl', u+'matomo.php']);
  //   _paq.push(['setSiteId', '${SiteId}']);
  //   var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  //   g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  // })();`;
  return (
    <>
      <Helmet>
        {/*Matomo*/}
        {/*<script>{scriptMatomoJavascript}</script>*/}
        {GestionBalises && <script>{scriptMatomoGestionBalises}</script>}
        {/*End Matomo Code*/}
      </Helmet>
    </>
  );
};

export default Matomo;
