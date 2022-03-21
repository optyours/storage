import { StorageManagerProps } from '../const';
export default class StorageManager {
    protected secret: string;
    protected encryption: boolean;
    constructor(props: StorageManagerProps);
    protected encrypted(values: any): any;
    protected decrypted(session: any): any;
    setStorage(key: any, values: any, options?: any): void;
    getStorage(key: any, defaultValue?: any): void;
    removeStorage(key: any): void;
}
