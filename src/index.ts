import { Plugin } from 'esbuild';

import { TypeOptions } from './types.js';
import { pluginName } from './constants.js';
import { validateOptions } from './validators/validateOptions.js';

export const pluginAny = (options?: TypeOptions): Plugin => {
  validateOptions(options);

  return {
    name: pluginName,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setup() {},
  };
};
