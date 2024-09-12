import { TypeModifierGetter } from '../types.js';

export const modifierLodash: TypeModifierGetter = (options) => ({
  filter: options.filter,
  replace:
    /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)['"](?:(?:lodash\/?.*?))['"][\s]*?(?:;|$|)/g,
  replacer() {
    return (match: string) => {
      const destructuredImportRegex = /\{\s?(((\w+),?\s?)+)\}/g;

      const destructuredImports = match.match(destructuredImportRegex);

      // import noop from 'lodash/noop';
      if (!destructuredImports) return match;

      // import { noop, isEmpty, debounce as _debounce } from 'lodash';
      return destructuredImports[0]
        .replace(/[{}]/g, '')
        .trim()
        .split(', ')
        .reduce((acc, name) => {
          const [realName, alias] = name.split(' as ');

          return `${acc}import ${alias || realName} from 'lodash/${realName}';\n`;
        }, '');
    };
  },
});
