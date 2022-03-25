const CryptoJS = require('crypto-js');

import { StorageManagerProps } from '../const';

export default class StorageManager {
  // protected secret: string;
  // protected encryption: boolean;

  constructor(props: StorageManagerProps) {
    //@ts-ignore
    this.secret = 'cool-digtal';
    //@ts-ignore
    this.encryption = props && props.encryption;
  }

  protected encrypted(values) {
    //@ts-ignore
    return CryptoJS.AES.encrypt(encodeURIComponent(JSON.stringify(values)), this.secret).toString();
  }

  protected decrypted(session) {
    //@ts-ignore
    return CryptoJS.AES.decrypt(session, this.secret).toString(CryptoJS.enc.Utf8);
  }

  public setStorage(key, values, options?) {
  }

  public getStorage(key, defaultValue?) {
  }

  public removeStorage(key) {
  }

}
