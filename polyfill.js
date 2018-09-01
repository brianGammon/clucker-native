/* eslint-disable */
import { Platform } from 'react-native';

/*
  This polyfill is needed for react-reactive-form, the suggested Android workaround
  cuases issues: https://github.com/bietkul/react-reactive-form

  This github issue suggests this polyfill, which seems cleaner:
  https://github.com/facebook/react-native/issues/15902
*/
if (Platform.OS === 'android') {
  if (typeof Symbol === 'undefined') {
    if (Array.prototype['@@iterator'] === undefined) {
      Array.prototype['@@iterator'] = function() {
        let i = 0;
        return {
          next: () => ({
            done: i >= this.length,
            value: this[i++],
          }),
        };
      };
    }
  }
}
