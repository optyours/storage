const CryptoJS = require('crypto-js');

import { StorageManagerProps } from '../const';

export default class StorageManager {
  protected secret: string;
  protected encryption: boolean;

  constructor(props: StorageManagerProps) {
    this.secret = 'cool-digtal';
    this.encryption = props?.encryption;
  }

  protected encrypted(values) {
    return CryptoJS.AES.encrypt(encodeURIComponent(JSON.stringify(values)), this.secret).toString();
  }

  protected decrypted(session) {
    return CryptoJS.AES.decrypt(session, this.secret).toString(CryptoJS.enc.Utf8);
  }

  public setStorage(key, values, options?) {
  }

  public getStorage(key, defaultValue?) {
  }

  public removeStorage(key) {
  }

}
