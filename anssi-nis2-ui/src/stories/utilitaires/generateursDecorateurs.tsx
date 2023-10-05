import { AppContext, Context } from "../../AppContext.tsx";
import { Component } from "@storybook/blocks";

export const genereDecorateurPourContexte = (context: Context) =>
  function StoryDecoree(StoryADecorer: Component) {
    return (
      <AppContext.Provider value={context}>
        <StoryADecorer />
      </AppContext.Provider>
    );
  };
