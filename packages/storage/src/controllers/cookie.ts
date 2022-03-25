const { set, get } = require('lodash');
const Cookies = require('js-cookie');
import StorageManager from './index';


export default class CookieStorage extends StorageManager {
  constructor(props?) {
    super({encryption: false});
  }


   private setItem(key, value, options?) {
      //@ts-ignore
    if (this.encryption) {
      Cookies.set(key, this.encrypted(value), options)
    } else {
      Cookies.set(key, JSON.stringify(value), options)
    }
  }

   public setStorage(key, values) {
    const names = key.split('.');
    if (names.length > 1) {
      const [ parentName, ...otherNames ] = names;
      const oldValue = this.getStorage(parentName) || {};
      set(oldValue, otherNames.join('.'), values);
      this.setItem(parentName, oldValue);
    } else {
      this.setItem(key, values);
    }
  }

  public getStorage (key, defaultValue?) {
    const name = key.split('.');
    const [ parent, ...otherNames ] = name;
    const session = Cookies.get(parent);
    if (session) {
      //@ts-ignore
      let result = this.encryption ? this.decrypted(session) : session;
      try {
        result = JSON.parse(decodeURIComponent(result));
        return name.length > 1 ? get(result, otherNames.join('.')) : result;
      } catch(e) {
        return result
      }
    }
  }

  public removeStorage (key) {
    Cookies.remove(key)
    return ''
  }
}
