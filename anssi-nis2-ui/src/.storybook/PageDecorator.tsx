import { AppContext, Context } from "../AppContext.tsx";
import { Args, Globals } from "@storybook/types";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactRenderer } from "@storybook/react";

const defaultAsyncStringFonctionInjected = async () => {
  return "";
};

// reducerFormData: Reducer<SimulateurFormData, SimulateurDonneesFormulaireActions>; reducerBoutons: Reducer<BoutonsNavigation, ActionsBoutonNavigation>;
export const defaultContext: Context = {
  sendFormData: defaultAsyncStringFonctionInjected,
  simulateur: {
    reducerBoutons: (state) => state,
    reducerFormData: (state) => state,
  },
};
type StoryContextUpdate<TArgs = Args> = {
  args?: TArgs;
  globals?: Globals;
  [key: string]: any;
};
type StoryComponent = (
  update?: StoryContextUpdate<Partial<unknown>>,
) => ReactRenderer["storyResult"];
//👇 This default export determines where your story goes in the story list
export const pageDecorator = (Story: StoryComponent) => {
  const router = createBrowserRouter([
    {
      path: "/*",
      element: <Story />,
    },
  ]);
  return (
    <AppContext.Provider value={defaultContext}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};
