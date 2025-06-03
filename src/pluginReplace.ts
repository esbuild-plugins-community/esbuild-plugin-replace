import * as fs from 'node:fs';

import { Plugin } from 'esbuild';

import { pluginName } from './constants.js';
import { TypeModifier, TypeOptions } from './types.js';
import { validateOptions } from './validators/validateOptions.js';

function replaceAsync(
  str: string,
  replace: string | RegExp,
  replacer: ReturnType<TypeModifier['replacer']>
) {
  const promises: Array<Promise<any>> = [];

  str.replace(replace, (match, ...args) => {
    if (typeof replacer === 'string') {
      promises.push(Promise.resolve(replacer));

      return match;
    }

    promises.push(Promise.resolve().then(() => replacer(match, ...args)));

    return match;
  });

  return Promise.all(promises).then((data) => str.replace(replace, () => data.shift()));
}

export const pluginReplace = (options: TypeOptions): Plugin => {
  validateOptions(options);

  return {
    name: pluginName,
    setup(build) {
      build.onLoad({ filter: /.*/ }, async (args) => {
        const matchingModifiers = options.filter((option) => option.filter.test(args.path));

        if (!matchingModifiers.length) return;

        const fileContent = fs.readFileSync(args.path, 'utf-8');

        let replacedContent = fileContent;

        while (matchingModifiers.length) {
          const modifier = matchingModifiers.shift()!;

          if (!modifier.includeNodeModules && args.path.includes('node_modules')) {
            continue;
          }

          // eslint-disable-next-line no-await-in-loop
          replacedContent = await replaceAsync(
            replacedContent,
            modifier.replace,
            modifier.replacer(args, fileContent)
          );
        }

        // eslint-disable-next-line consistent-return
        return {
          contents: replacedContent,
          loader: 'default',
        };
      });
    },
  };
};
