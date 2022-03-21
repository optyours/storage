# `storage`

> TODO: description

## Usage
## 使用localStorage

```
import {
  local, encryptionLocal, 
} from 'storage';

local.setStorage('storage', {name: 1});

encryptionLocal.setStorage('storage_encryption', {name: 2}) // 对存储的信息进行加密

```

## 使用sesssionStorage

```
import {
   sessionLocal, encryptionSessionLocal, 
} from 'storage';

sessionLocal.setStorage('storage', {name: 1});

encryptionSessionLocal.setStorage('storage_encryption', {name: 2}) // 对存储的信息进行加密

```
## 使用cookie


```
import {
  cookieLocal, encryptionCookieLocal
} from 'storage';

cookieLocal.setStorage('storage', {name: 1});
encryptionCookieLocal.setStorage('storage_encryption', {name: 2}) // 对存储的信息进行加密
```


