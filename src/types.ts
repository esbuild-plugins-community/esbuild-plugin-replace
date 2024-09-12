import { OnLoadArgs } from 'esbuild';

export type TypeOptions = Array<TypeModifier>;

export type TypeModifier = {
  filter: RegExp;
  replace: string | RegExp;
  replacer: (
    onLoadArgs: OnLoadArgs
  ) => string | ((substring: string, ...args: Array<any>) => string);
};

export type TypeModifierGetter = (options: { filter: TypeModifier['filter'] }) => TypeModifier;
