import LocalStorage from './controllers/localStorage';
import SessionStorage from './controllers/sessionStorage';
import CookieStorage from './controllers/cookie';

export const Local = new LocalStorage();
export const encryptionLocal = new LocalStorage({encryption: true});

export const sessionLocal = new SessionStorage();
export const encryptionSessionLocal = new SessionStorage({encryption: true});


export const cookieLocal = new CookieStorage();
export const encryptionCookieLocal = new CookieStorage({encryption: true});
