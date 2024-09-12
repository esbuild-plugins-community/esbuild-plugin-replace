import { describe, it } from 'node:test';
import assert from 'node:assert';

import * as exportContent from '../dist/esm/index.js';

void describe('Test import esm', async () => {
  await it('success', () => {
    assert.deepEqual(Object.keys(exportContent).sort(), [
      'modifierDirname',
      'modifierFilename',
      'modifierLodash',
      'modifierMobxObserverFC',
      'pluginReplace',
    ]);
    assert.deepEqual(typeof exportContent.pluginReplace, 'function');
    assert.deepEqual(typeof exportContent.modifierFilename, 'function');
    assert.deepEqual(typeof exportContent.modifierDirname, 'function');
    assert.deepEqual(typeof exportContent.modifierMobxObserverFC, 'function');
    assert.deepEqual(typeof exportContent.modifierLodash, 'function');
  });
});
