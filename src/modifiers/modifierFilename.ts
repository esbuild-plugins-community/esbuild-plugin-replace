import * as path from 'node:path';

import { TypeModifierGetter } from '../types.js';

export const modifierFilename: TypeModifierGetter = (options) => ({
  filter: options.filter,
  replace: /__filename/g,
  replacer(onLoadArgs) {
    return () => {
      return `"${path.relative(process.cwd(), onLoadArgs.path).replaceAll(path.sep, path.posix.sep)}"`;
    };
  },
});
