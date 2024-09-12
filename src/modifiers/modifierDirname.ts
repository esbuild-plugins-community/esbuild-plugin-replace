import * as path from 'node:path';

import { TypeModifierGetter } from '../types.js';

export const modifierDirname: TypeModifierGetter = (options) => ({
  filter: options.filter,
  replace: /__dirname/g,
  replacer(onLoadArgs) {
    return () => {
      return `"${path.relative(process.cwd(), path.dirname(onLoadArgs.path)).replaceAll(path.sep, path.posix.sep)}"`;
    };
  },
});
