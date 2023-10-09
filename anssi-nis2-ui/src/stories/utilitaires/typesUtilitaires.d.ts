export type StoryContextUpdate<TArgs = Args> = {
  args?: TArgs;
  globals?: Globals;
  [key: string]: unknown;
};
export type StoryComponent = (
  update?: StoryContextUpdate<Partial<unknown>>,
) => ReactRenderer["storyResult"];