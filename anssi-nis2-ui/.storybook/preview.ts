import type { Preview } from "@storybook/react-vite";

import "@gouvfr/dsfr/dist/utility/icons/icons.min.css";
import "@gouvfr/dsfr/dist/dsfr.min.css";
import "../src/style/App.scss";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";

startReactDsfr({ defaultColorScheme: "system" });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
