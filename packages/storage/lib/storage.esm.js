/*!
 * storage.js v0.0.0
 * (c) 2022-2022 gaofeng
 * Released under the MIT License.
 */
import { set, get } from 'lodash';

const CryptoJS = require('crypto-js');
class StorageManager {
    secret;
    encryption;
    constructor(props) {
        this.secret = 'cool-digtal';
        this.encryption = props?.encryption;
    }
    encrypted(values) {
        return CryptoJS.AES.encrypt(encodeURIComponent(JSON.stringify(values)), this.secret).toString();
    }
    decrypted(session) {
        return CryptoJS.AES.decrypt(session, this.secret).toString(CryptoJS.enc.Utf8);
    }
    setStorage(key, values, options) {
    }
    getStorage(key, defaultValue) {
    }
    removeStorage(key) {
    }
}

class LocalStorage extends StorageManager {
    constructor(props) {
        super({ encryption: props?.encryption || false });
    }
    setItem(key, value) {
        if (this.encryption) {
            localStorage.setItem(key, this.encrypted(value));
        }
        else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
    setStorage(key, values) {
        const names = key.split('.');
        if (names.length > 1) {
            const [parentName, ...otherNames] = names;
            const oldValue = this.getStorage(parentName) || {};
            set(oldValue, otherNames.join('.'), values);
            this.setItem(parentName, oldValue);
        }
        else {
            this.setItem(key, values);
        }
    }
    getStorage(key) {
        const name = key.split('.');
        const [parent, ...otherNames] = name;
        const session = localStorage.getItem(parent);
        if (session) {
            let result = this.encryption ? this.decrypted(session) : session;
            try {
                result = JSON.parse(decodeURIComponent(result));
                return name.length > 1 ? get(result, otherNames.join('.')) : result;
            }
            catch (e) {
                return result;
            }
        }
    }
    removeStorage(key) {
        localStorage.removeItem(key);
    }
}

class SessionStorage extends StorageManager {
    constructor(props) {
        super({ encryption: props?.encryption || false });
    }
    setItem(key, value) {
        if (this.encryption) {
            sessionStorage.setItem(key, this.encrypted(value));
        }
        else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }
    setStorage(key, values) {
        const names = key.split('.');
        if (names.length > 1) {
            const [parentName, ...otherNames] = names;
            const oldValue = this.getStorage(parentName) || {};
            set(oldValue, otherNames.join('.'), values);
            this.setItem(parentName, oldValue);
        }
        else {
            this.setItem(key, values);
        }
    }
    getStorage(key) {
        const name = key.split('.');
        const [parent, ...otherNames] = name;
        const session = sessionStorage.getItem(parent);
        if (session) {
            let result = this.encryption ? this.decrypted(session) : session;
            try {
                result = JSON.parse(decodeURIComponent(result));
                return name.length > 1 ? get(result, otherNames.join('.')) : result;
            }
            catch (e) {
                return result;
            }
        }
    }
    removeStorage(key) {
        sessionStorage.removeItem(key);
    }
}

const Cookies = require('js-cookie');
class CookieStorage extends StorageManager {
    constructor(props) {
        super({ encryption: false });
    }
    setItem(key, value, options) {
        if (this.encryption) {
            Cookies.set(key, this.encrypted(value), options);
        }
        else {
            Cookies.set(key, JSON.stringify(value), options);
        }
    }
    setStorage(key, values) {
        const names = key.split('.');
        if (names.length > 1) {
            const [parentName, ...otherNames] = names;
            const oldValue = this.getStorage(parentName) || {};
            set(oldValue, otherNames.join('.'), values);
            this.setItem(parentName, oldValue);
        }
        else {
            this.setItem(key, values);
        }
    }
    getStorage(key, defaultValue) {
        const name = key.split('.');
        const [parent, ...otherNames] = name;
        const session = Cookies.get(parent);
        if (session) {
            let result = this.encryption ? this.decrypted(session) : session;
            try {
                result = JSON.parse(decodeURIComponent(result));
                return name.length > 1 ? get(result, otherNames.join('.')) : result;
            }
            catch (e) {
                return result;
            }
        }
    }
    removeStorage(key) {
        Cookies.remove(key);
        return '';
    }
}

const Local = new LocalStorage();
const encryptionLocal = new LocalStorage({ encryption: true });
const sessionLocal = new SessionStorage();
const encryptionSessionLocal = new SessionStorage({ encryption: true });
const cookieLocal = new CookieStorage();
const encryptionCookieLocal = new CookieStorage({ encryption: true });

export { Local, cookieLocal, encryptionCookieLocal, encryptionLocal, encryptionSessionLocal, sessionLocal };
