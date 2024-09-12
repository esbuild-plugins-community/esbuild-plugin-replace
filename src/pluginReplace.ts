import * as fs from 'node:fs';

import { Plugin } from 'esbuild';

import { pluginName } from './constants.js';
import { TypeOptions } from './types.js';
import { validateOptions } from './validators/validateOptions.js';

export const pluginReplace = (options: TypeOptions): Plugin => {
  validateOptions(options);

  return {
    name: pluginName,
    setup(build) {
      build.onLoad(
        {
          filter:
            /^([^n]|n(n|o(n|d(n|e(n|_(n|m(n|o(n|d(n|u(n|l(n|en))))))))))*([^no]|o([^dn]|d([^en]|e([^_n]|_([^mn]|m([^no]|o([^dn]|d([^nu]|u([^ln]|l([^en]|e[^ns])))))))))))*(n(n|o(n|d(n|e(n|_(n|m(n|o(n|d(n|u(n|l(n|en))))))))))*(o(d?|de(_?|_m(o?|od(u?|ule?)))))?)?$/g,
        },
        // eslint-disable-next-line consistent-return
        async (args) => {
          let newContents = '';

          options.forEach((option) => {
            if (!option.filter.test(args.path)) return;

            if (!newContents) {
              newContents = fs.readFileSync(args.path, 'utf-8');
            }

            newContents = newContents.replace(option.replace, option.replacer(args) as any);
          });

          if (newContents) {
            return { contents: newContents, loader: 'default' };
          }
        }
      );
    },
  };
};
