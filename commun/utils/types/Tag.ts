export type Tag<E extends string, TagName extends string = "_tag"> = {
  [k in TagName]: `${E}`;
};
