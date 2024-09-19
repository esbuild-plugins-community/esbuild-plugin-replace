import * as fs from 'node:fs';
import * as path from 'node:path';
import * as assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import { build, BuildOptions } from 'esbuild';

import {
  pluginReplace,
  modifierLodash,
  modifierDirname,
  modifierFilename,
  modifierMobxObserverFC,
} from '../src/index.js';

void describe('Plugin test', async () => {
  const pathRes = path.resolve('test/res');
  const pathTemp = path.resolve('test/tmp');

  if (!fs.existsSync(pathTemp)) {
    fs.mkdirSync(pathTemp);
  }

  const getConfig = (): BuildOptions => ({
    bundle: true,
    format: 'esm',
    logLevel: 'silent',
    outdir: pathTemp,
    target: 'chrome120',
    platform: 'browser',
    write: true,
    resolveExtensions: ['.ts'],
  });

  afterEach(() => {
    fs.readdirSync(pathTemp).forEach((file) => {
      fs.unlinkSync(path.resolve(pathTemp, file));
    });
  });

  await it('modifierFilename', async () => {
    const fileName = 'modifierFilename';

    await build({
      ...getConfig(),
      entryPoints: [path.resolve(pathRes, `${fileName}.ts`)],
      plugins: [pluginReplace([modifierFilename({ filter: /\.ts$/ })])],
    });

    const content = fs.readFileSync(path.resolve(pathTemp, `${fileName}.js`), 'utf8');

    assert.equal(
      content,
      `// node_modules/.pnpm/@lukeed+uuid@2.0.1/node_modules/@lukeed/uuid/dist/index.mjs
var IDX = 256;
var HEX = [];
var BUFFER;
while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);
function v4() {
  var i = 0, num, out = "";
  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array(i = 256);
    while (i--) BUFFER[i] = 256 * Math.random() | 0;
    i = IDX = 0;
  }
  for (; i < 16; i++) {
    num = BUFFER[IDX + i];
    if (i == 6) out += HEX[num & 15 | 64];
    else if (i == 8) out += HEX[num & 63 | 128];
    else out += HEX[num];
    if (i & 1 && i > 1 && i < 11) out += "-";
  }
  IDX++;
  return out;
}

// test/res/modifierFilenameHelper.js
var helper = __filename;

// test/res/modifierFilename.ts
var test = "test/res/modifierFilename.ts";
var test2 = "test/res/modifierFilename.ts";
var test3 = helper;
export {
  test,
  test2,
  test3,
  v4
};
`
    );
  });

  await it('modifierDirname', async () => {
    const fileName = 'modifierDirname';

    await build({
      ...getConfig(),
      entryPoints: [path.resolve(pathRes, `${fileName}.ts`)],
      plugins: [pluginReplace([modifierDirname({ filter: /\.ts$/ })])],
    });

    const content = fs.readFileSync(path.resolve(pathTemp, `${fileName}.js`), 'utf8');

    assert.equal(
      content,
      `// node_modules/.pnpm/@lukeed+uuid@2.0.1/node_modules/@lukeed/uuid/dist/index.mjs
var IDX = 256;
var HEX = [];
var BUFFER;
while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);
function v4() {
  var i = 0, num, out = "";
  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array(i = 256);
    while (i--) BUFFER[i] = 256 * Math.random() | 0;
    i = IDX = 0;
  }
  for (; i < 16; i++) {
    num = BUFFER[IDX + i];
    if (i == 6) out += HEX[num & 15 | 64];
    else if (i == 8) out += HEX[num & 63 | 128];
    else out += HEX[num];
    if (i & 1 && i > 1 && i < 11) out += "-";
  }
  IDX++;
  return out;
}

// test/res/modifierDirnameHelper.js
var helper = __dirname;

// test/res/modifierDirname.ts
var test = "test/res";
var test2 = "test/res";
var test3 = helper;
export {
  test,
  test2,
  test3,
  v4
};
`
    );
  });

  await it('modifierMobxObserverFC', async () => {
    const fileName = 'modifierMobxObserverFC';

    await build({
      ...getConfig(),
      entryPoints: [path.resolve(pathRes, `${fileName}.tsx`)],
      plugins: [pluginReplace([modifierMobxObserverFC({ filter: /\.tsx$/ })])],
      packages: 'external',
    });

    const content = fs.readFileSync(path.resolve(pathTemp, `${fileName}.js`), 'utf8');

    assert.equal(
      content,
      `// test/res/modifierMobxObserverFCHelper.js
function Helper() {
  return null;
}

// test/res/modifierMobxObserverFC.tsx
import { observer } from "mobx-react-lite";
var Component = observer(function Component2() {
  return null;
});
var ComponentExport = observer(function ComponentExport2() {
  return null;
});
var modifierMobxObserverFC_default = observer(function ComponentDefault() {
  return null;
});
var ComponentProps = observer(function ComponentProps2(props) {
  return null;
});
var ComponentTypes = observer(function ComponentTypes2(props) {
  return null;
});
export {
  ComponentExport,
  Helper,
  modifierMobxObserverFC_default as default
};
`
    );
  });

  await it('modifierLodash', async () => {
    const fileName = 'modifierLodash';

    await build({
      ...getConfig(),
      entryPoints: [path.resolve(pathRes, `${fileName}.ts`)],
      plugins: [pluginReplace([modifierLodash({ filter: /\.ts$/ })])],
      packages: 'external',
    });

    const content = fs.readFileSync(path.resolve(pathTemp, `${fileName}.js`), 'utf8');

    assert.equal(
      content,
      `// test/res/modifierLodash.ts
import chunk from "lodash/chunk";
import last from "lodash/last";
import _get2 from "lodash/get";
import noop from "lodash/noop";
import _ from "lodash";

// test/res/modifierLodashHelper.js
import { isEmpty } from "lodash";

// test/res/modifierLodashHelper2.ts
import _get from "lodash/get";

// test/res/modifierLodash.ts
var test = isEmpty;
var test2 = chunk || last || _get2 || noop || _ || _get;
export {
  test,
  test2
};
`
    );
  });

  await it('All modifiers', async () => {
    const fileName = 'modifierAll';

    await build({
      ...getConfig(),
      entryPoints: [path.resolve(pathRes, `${fileName}.tsx`)],
      plugins: [
        pluginReplace([
          modifierDirname({ filter: /\.tsx?$/ }),
          modifierFilename({ filter: /\.tsx?$/ }),
          modifierLodash({ filter: /\.tsx?$/ }),
          modifierMobxObserverFC({ filter: /\.tsx?$/ }),
        ]),
      ],
      packages: 'external',
    });

    const content = fs.readFileSync(path.resolve(pathTemp, `${fileName}.js`), 'utf8');

    assert.equal(
      content,
      `// test/res/modifierAll.tsx
import { observer } from "mobx-react-lite";
var Component = observer(function Component2() {
  return null;
});
var ComponentExport = observer(function ComponentExport2() {
  return null;
});
var test = "test/res";
var test2 = "test/res";
var test3 = "test/res/modifierAll.tsx";
var test4 = "test/res/modifierAll.tsx";
export {
  ComponentExport,
  test,
  test2,
  test3,
  test4
};
`
    );
  });
});
