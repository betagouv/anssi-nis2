import { AppContext } from "../../AppContext.tsx";
import { Component } from "@storybook/blocks";

import { Contexte } from "../../Services/contexte";

export const genereDecorateurPourContexte = (context: Contexte) =>
  function StoryDecoree(StoryADecorer: Component) {
    return (
      <AppContext.Provider value={context}>
        <StoryADecorer />
      </AppContext.Provider>
    );
  };
