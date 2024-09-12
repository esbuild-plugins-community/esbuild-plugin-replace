import { TypeModifierGetter } from '../types.js';

export const modifierMobxObserverFC: TypeModifierGetter = (options) => ({
  filter: options.filter,
  replace: /(export default |export )?function ([A-Z][a-zA-Z0-9]+)(.*?(?=;\n}\n));\n}\n/gs,
  replacer() {
    let observerInjected = false;

    return (
      match: string,
      exportStatement: string,
      functionName: string,
      functionContent: string
      // eslint-disable-next-line max-params
    ) => {
      const wrappedComponent = `observer(function ${functionName}${functionContent};\n})\n`;

      let str = observerInjected ? '' : "\nimport { observer } from 'mobx-react-lite';\n";

      if (exportStatement) str += exportStatement;

      if (!exportStatement || !exportStatement.includes('default')) {
        str += `const ${functionName} = ${wrappedComponent}`;
      } else {
        str += wrappedComponent;
      }

      observerInjected = true;

      return str;
    };
  },
});
