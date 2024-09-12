// @ts-ignore
import { chunk, last } from 'lodash';
// @ts-ignore
// eslint-disable-next-line no-duplicate-imports
import { get as _get } from 'lodash';
// @ts-ignore
// eslint-disable-next-line no-restricted-imports
import noop from 'lodash/noop';
// @ts-ignore
// eslint-disable-next-line no-duplicate-imports,@typescript-eslint/naming-convention
import _ from 'lodash';

// @ts-ignore
import { isEmpty } from './modifierLodashHelper.js';
import { _get as __get } from './modifierLodashHelper2.js';

export const test = isEmpty;
export const test2 = chunk || last || _get || noop || _ || __get;
