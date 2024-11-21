import Cookies from 'js-cookie';
import CryptoJs from 'crypto-js';

const TokenKey = 'realToken'
// 密钥
const key = '1112345345676435';
// 十六位十六进制数作为秘钥
const aesKey = CryptoJs.enc.Latin1.parse(key);

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setLocalStorage(key: string, item: any) {
  return localStorage.setItem(key, item)
}

export function getLocalStorage(key: string) {
  return localStorage.getItem(key)
}

export function removeStorageItem(key: string) {
  return localStorage.removeItem(key)
}

export function clearLocalStorage() {
  sessionStorage.clear()
  return localStorage.clear()
}

export function random(length: number) {
  var str = Math.random().toString(36).substr(2);
  if (str.length >= length) {
    return str.substr(0, length);
  }
  str += random(length - str.length);
  return str;
}

// md5 加密
export const md5 = (str: string) => CryptoJs.MD5(str).toString();

// AES加密
export const AESEncrypt = (str: string) => {
  const srcs = CryptoJs.enc.Utf8.parse(str);

  return CryptoJs.AES.encrypt(srcs, aesKey, {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7
  }).toString();
}

// 对token进行加密生成ticket  timestamp+token => AES
export const encrypted = (timestamp: string | number) => {
  const token = getToken();
  const ran = random(8)
  const key = `${timestamp}${ran}${token}`
  const srcs = CryptoJs.enc.Utf8.parse(key);

  return CryptoJs.AES.encrypt(srcs, aesKey, {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7
  }).toString();
}
