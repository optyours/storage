import StorageManager from './index';
export default class LocalStorage extends StorageManager {
    constructor(props?: any);
    private setItem;
    setStorage(key: any, values: any): void;
    getStorage(key: any): any;
    removeStorage(key: any): void;
}
