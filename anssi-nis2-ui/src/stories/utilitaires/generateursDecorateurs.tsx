import { AppContext } from "../../Services/AppContexte/AppContext.definition.ts";
import { Component } from "@storybook/blocks";

import { Contexte } from "../../Services/contexte";
import { Helmet } from "react-helmet";

export const genereDecorateurPourContexte = (context: Contexte) =>
  function StoryDecoree(StoryADecorer: Component) {
    const scriptContenu =
      "var _paq = window._paq = window._paq || [];" +
      "var _mtm = window._mtm = window._mtm || [];";
    return (
      <AppContext.Provider value={context}>
        <Helmet>
          <link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
          <link rel="stylesheet" href="/dsfr/dsfr.min.css" />
          <link rel="stylesheet" href="../../App.css" />
          <script>{scriptContenu}</script>
        </Helmet>
        <StoryADecorer />
      </AppContext.Provider>
    );
  };
