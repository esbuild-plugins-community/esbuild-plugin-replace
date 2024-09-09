import path from 'node:path';

import { getEslintConfig } from '@espcom/eslint-config';

const eslintConfig = getEslintConfig({
  tsConfigPath: path.resolve('./tsconfig.json'),
});

export default eslintConfig;
