import { TypeOptions } from '../types.js';
import { pluginName } from '../constants.js';

export function validateOptions(options?: TypeOptions) {
  if (!options || !Array.isArray(options)) {
    throw new Error(`${pluginName}: Options must be an array`);
  }

  options.forEach((option) => {
    if (Object.prototype.toString.call(option) !== '[object Object]') {
      throw new Error(`${pluginName}: Option item must be a plain object`);
    }

    if (!(option.filter instanceof RegExp)) {
      throw new Error(`${pluginName}: The "filter" parameter must be a RegExp`);
    }

    if (!(option.replace instanceof RegExp) && typeof option.replace !== 'string') {
      throw new Error(`${pluginName}: The "replace" parameter must be a RegExp or string`);
    }

    if (typeof option.replace === 'string' && !option.replace) {
      throw new Error(`${pluginName}: The "replace" parameter must be a non-empty string`);
    }

    if (typeof option.replacer !== 'function') {
      throw new Error(`${pluginName}: The "replacer" parameter must be a function`);
    }
  });
}
