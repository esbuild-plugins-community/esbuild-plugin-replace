## @espcom/esbuild-plugin-replace

[![npm](https://img.shields.io/npm/v/@espcom/esbuild-plugin-replace)](https://www.npmjs.com/package/@espcom/esbuild-plugin-replace)
![coverage](https://github.com/esbuild-plugins-community/esbuild-plugin-replace/blob/main/assets/coverage.svg)
![size-esm](https://github.com/esbuild-plugins-community/esbuild-plugin-replace/blob/main/assets/esm.svg)
![size-cjs](https://github.com/esbuild-plugins-community/esbuild-plugin-replace/blob/main/assets/cjs.svg)

A plugin for `esbuild` that allows for customizable string replacement in files during 
the build process. One of the challenges with `esbuild` is that multiple plugins modifying file 
contents can not work with each other, as `esbuild` doesn't natively support piping 
content between plugins. This plugin solves that problem by facilitating the combination 
of multiple transformations, offering predefined and custom modifiers
that can be used to manipulate file contents based on regular expressions.

## Features

- **Customizable Replacements**: Easily define patterns and replacement logic using regular expressions.
- **Predefined Modifiers**: Pre-included modifiers for common use cases.
- **TypeScript Support**: Fully typed to ensure smooth integration with TypeScript projects.
- **Pipeline Compatibility**: Enables multiple file transformations to work together without conflict.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Example](#example)
  - [Plugin Options](#plugin-options)
  - [Example Modifier](#example-modifier)
- [Predefined Modifiers](#predefined-modifiers)
  - [modifierDirname](#modifierdirname)
  - [modifierFilename](#modifierfilename)
  - [modifierMobxObserverFC](#modifiermobxobserverfc)
  - [modifierLodash](#modifierlodash)

## Installation

Install the plugin using npm:

```bash
npm install @espcom/esbuild-plugin-replace
```

## Usage

To use the plugin, simply add it to your `esbuild` configuration and pass an array of 
replacement options. Each option consists of a filter, replace pattern, and a replacer function.

### Example

```typescript
import { pluginReplace } from '@espcom/esbuild-plugin-replace';
import esbuild, { OnLoadArgs } from 'esbuild';

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [
    pluginReplace([
      {
        filter: /\.js$/,    // Only apply to specific files
        replace: 'someString' || /some-regexp/g,
        replacer: (onLoadArgs: OnLoadArgs, fileContent: string) => {
          return 'otherString' || (match, group) => ''
        },
      }
    ]),
  ],
});
```

### Plugin Options

The plugin accepts an array of options, where each option contains:

- `filter` (RegExp): A regular expression to match file paths that should be processed.
- `replace` (string | RegExp): A string or regular expression to search for within the matched files.
- `replacer` (function): A function that takes `onLoadArgs` and `fileContent` and returns the replacement 
string or a function for advanced replacements.

### Example Modifier

Here's an example of a custom modifier to replace `__dirname` in files:

```typescript
{
  filter: /src\/.*\.js$/,    // Match all .js files in the src directory
  replace: /__dirname/g,      // Replace all occurrences of __dirname
  replacer: (onLoadArgs) => `"${path.relative(process.cwd(), path.dirname(onLoadArgs.path))}"`,
}
```

## Predefined Modifiers

### `modifierDirname`

Replaces all instances of `__dirname` with the relative path to the file’s directory.

```typescript
import { modifierDirname } from '@espcom/esbuild-plugin-replace';

pluginReplace([modifierDirname({ filter: /\.ts$/ })]);
```

Example input:

```typescript
// src/components/test.ts
export const test = __dirname;
```

Example output:

```typescript
export const test = "src/components";
```

### `modifierFilename`

Replaces all instances of `__filename` with the relative path to the current file.

```typescript
import { modifierFilename } from '@espcom/esbuild-plugin-replace';

pluginReplace([modifierFilename({ filter: /\.ts$/ })]);
```

Example input:

```typescript
// src/components/test.ts
export const test = __filename;
```

Example output:

```typescript
export const test = "src/components/test.ts";
```

### `modifierMobxObserverFC`

Automatically wraps React function components with `observer` from `mobx-react-lite`. You have to
install `mobx-react-lite` before usage.

```typescript
import { modifierMobxObserverFC } from '@espcom/esbuild-plugin-replace';

pluginReplace([modifierMobxObserverFC({ filter: /\.tsx$/ })]);
```

Example input:

```typescript
function ComponentProps(props: Record<string, string>) {
  return null;
}

export function ComponentExport() {
  return null;
}
export default function ComponentDefault() {
  return null;
}

function ComponentTypes<TTest extends Record<string, string>>(props: Record<string, TTest>) {
  return null;
}
```

Example output:

```typescript
import { observer } from "mobx-react-lite";

const ComponentProps = observer(function ComponentProps() {
  return null;
});
export const ComponentExport = observer(function ComponentExport() {
  return null;
});
export default observer(function ComponentDefault() {
  return null;
});
const ComponentTypes = observer(function ComponentTypes(props) {
  return null;
});
```

### `modifierLodash`

Optimizes `lodash` imports by replacing grouped imports with individual imports for each function.
Be aware that this modifier does not replace default imports like `import _ from 'lodash'` yet.

```typescript
import { modifierLodash } from '@espcom/esbuild-plugin-replace';

pluginReplace([modifierLodash({ filter: /src\/.*\.js$/ })]);
```

Example input:

```typescript
import { chunk, last } from 'lodash';
import { get as _get } from 'lodash';
import noop from 'lodash/noop';
import _ from 'lodash';
```

Example output:

```typescript
import chunk from "lodash/chunk";
import last from "lodash/last";
import _get from "lodash/get";
import noop from "lodash/noop";
import _ from "lodash";
```

