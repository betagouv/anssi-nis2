import { AppContext } from "../../AppContext.tsx";
import { Component } from "@storybook/blocks";
import { Context } from "../../Services/context";

export const genereDecorateurPourContexte = (context: Context) =>
  function StoryDecoree(StoryADecorer: Component) {
    return (
      <AppContext.Provider value={context}>
        <StoryADecorer />
      </AppContext.Provider>
    );
  };
