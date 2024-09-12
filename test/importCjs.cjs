const { describe, it } = require('node:test');
const assert = require('node:assert');

const exportContent = require('../dist/cjs/index');

void describe('Test import cjs', async () => {
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
