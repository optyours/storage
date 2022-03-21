import StorageManager from './index';
export default class CookieStorage extends StorageManager {
    constructor(props?: any);
    private setItem;
    setStorage(key: any, values: any): void;
    getStorage(key: any, defaultValue?: any): any;
    removeStorage(key: any): string;
}
