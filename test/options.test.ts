import { describe, it } from 'node:test';
import * as assert from 'node:assert/strict';

import { pluginReplace } from '../src/index.js';
import { TypeOptions } from '../src/types.js';

const nonArrays = [0, true, null, '', {}, () => false];
const nonObjects = [0, true, null, '', [], () => false];
const nonRegExp = [0, true, null, [], () => false, {}, ''];
const nonRegExpOrString = [0, true, null, [], () => false, {}];
const nonFunctions = [0, true, null, [], '', {}];

const getOptions = (options: Partial<TypeOptions[number]>) => {
  return [
    {
      filter: typeof options.filter !== 'undefined' ? options.filter : /./,
      replace: typeof options.replace !== 'undefined' ? options.replace : /./,
      replacer: typeof options.replacer !== 'undefined' ? options.replacer : () => '',
    },
  ] as TypeOptions;
};

void describe('Validate options', async () => {
  await it('options should be an array', () => {
    // @ts-ignore
    assert.throws(() => pluginReplace(), {
      message: '@espcom/esbuild-plugin-replace: Options must be an array',
    });

    nonArrays.forEach((value: any) => {
      assert.throws(() => pluginReplace(value), {
        message: '@espcom/esbuild-plugin-replace: Options must be an array',
      });
    });
  });

  await it('option should be an object', () => {
    nonObjects.forEach((value: any) => {
      assert.throws(() => pluginReplace([value]), {
        message: '@espcom/esbuild-plugin-replace: Option item must be a plain object',
      });
    });

    assert.doesNotThrow(() => pluginReplace(getOptions({})));
  });

  await it('options.filter should be a RegExp', () => {
    nonRegExp.forEach((value: any) => {
      assert.throws(() => pluginReplace(getOptions({ filter: value })), {
        message: '@espcom/esbuild-plugin-replace: The "filter" parameter must be a RegExp',
      });
    });
  });

  await it('options.replace should be a RegExp or a full string', () => {
    nonRegExpOrString.forEach((value: any) => {
      assert.throws(() => pluginReplace(getOptions({ replace: value })), {
        message:
          '@espcom/esbuild-plugin-replace: The "replace" parameter must be a RegExp or string',
      });
    });

    assert.throws(() => pluginReplace(getOptions({ replace: '' })), {
      message: '@espcom/esbuild-plugin-replace: The "replace" parameter must be a non-empty string',
    });
  });

  await it('options.replacer should be a function', () => {
    nonFunctions.forEach((value: any) => {
      assert.throws(() => pluginReplace(getOptions({ replacer: value })), {
        message: '@espcom/esbuild-plugin-replace: The "replacer" parameter must be a function',
      });
    });
  });
});
