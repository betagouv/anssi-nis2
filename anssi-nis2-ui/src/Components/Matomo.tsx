import { Helmet } from "react-helmet";
import { DefaultComponentExtensible, DefaultProps } from "../Services/Props";

type MatomoProps = DefaultProps & { matomoSiteId: string };

const Matomo: DefaultComponentExtensible<MatomoProps> = ({
  matomoSiteId,
}: MatomoProps) => {
  const script = ` var _mtm = window._mtm = window._mtm || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
  (function() {
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://stats.beta.gouv.fr/js/container_${matomoSiteId}.js'; s.parentNode.insertBefore(g,s);
  })();`;
  return (
    <>
      <Helmet>
        {/*Matomo*/}
        <script>{script}</script>
        {/*End Matomo Code*/}
      </Helmet>
    </>
  );
};

export default Matomo;
