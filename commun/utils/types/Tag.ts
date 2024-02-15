export type Tag<
  E extends string,
  TagName extends string = "_tag"
> = TagName extends "_tag"
  ? {
      [k in TagName]: `${E}`;
    }
  : {
      [k in `_${Uncapitalize<TagName>}`]: `${E}`;
    };

export type RemoveTag<
  E extends Tag<string>,
  TagName extends string = "_tag"
> = TagName extends "_tag"
  ? Omit<E, TagName>
  : Omit<E, `_${Uncapitalize<TagName>}`>;
