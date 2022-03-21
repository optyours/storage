import { set, get } from 'lodash';
import StorageManager from './index';


export default class LocalStorage extends StorageManager {
  constructor(props?) {
    super({encryption: props?.encryption || false});
  }

  private setItem(key, value) {
    if (this.encryption) {
      localStorage.setItem(key, this.encrypted(value));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
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

  public getStorage(key) {
    const name = key.split('.');
    const [ parent, ...otherNames ] = name;
    const session = localStorage.getItem(parent);
    if (session) {
      let result = this.encryption ? this.decrypted(session) : session;
      try {
        result = JSON.parse(decodeURIComponent(result));
        return name.length > 1 ? get(result, otherNames.join('.')) : result;
      } catch(e) {
        return result
      }
    }
  }

  public removeStorage(key) {
    localStorage.removeItem(key);
  }
}
