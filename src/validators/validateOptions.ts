import { TypeOptions } from '../types.js';
import { pluginName } from '../constants.js';

export function validateOptions(options?: TypeOptions) {
  if (typeof options !== 'undefined') {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      throw new Error(`${pluginName}: Options must be a plain object`);
    }

    if (typeof options.param !== 'undefined') {
      if (typeof options.param !== 'string') {
        throw new Error(`${pluginName}: The "param" parameter must be a string`);
      }
      if (!options.param) {
        throw new Error(`${pluginName}: The "param" parameter must be a non-empty string`);
      }
    }
  }
}
