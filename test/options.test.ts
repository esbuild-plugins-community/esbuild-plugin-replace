import { describe, it } from 'node:test';
import * as assert from 'node:assert/strict';

import { pluginAny } from '../src/index.js';

const nonObjects = [0, true, null, '', [], () => false];
const nonStrings = [0, true, null, [], () => false, {}];

void describe('Validate options', async () => {
  await it('options should be an object or undefined', () => {
    assert.doesNotThrow(() => pluginAny());
    assert.doesNotThrow(() => pluginAny({}));

    nonObjects.forEach((value: any) => {
      assert.throws(() => pluginAny(value), {
        message: '@espcom/any: Options must be a plain object',
      });
    });
  });

  await it('options.param should be a full string or undefined', () => {
    assert.doesNotThrow(() => pluginAny({ param: undefined }));
    assert.doesNotThrow(() => pluginAny({ param: '1' }));
    assert.throws(() => pluginAny({ param: '' }), {
      message: '@espcom/any: The "param" parameter must be a non-empty string',
    });

    nonStrings.forEach((value: any) => {
      assert.throws(() => pluginAny({ param: value }), {
        message: '@espcom/any: The "param" parameter must be a string',
      });
    });
  });
});
