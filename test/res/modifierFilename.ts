import { v4 } from '@lukeed/uuid';

// @ts-ignore
import { helper } from './modifierFilenameHelper.js';

export const test = __filename;
export const test2 = __filename;
export const test3 = helper;

export { v4 };
