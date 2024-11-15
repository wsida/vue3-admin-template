import CryptoJS from "crypto-js";
import randomString from "./randomString";

export const SECRET_KEY = randomString(16);

export function encryptData(plaintext: string): string {
  return CryptoJS.AES.encrypt(plaintext, SECRET_KEY).toString();
}

export function decryptData(ciphertext: string): string {
  return CryptoJS.AES.decrypt(ciphertext, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
}
