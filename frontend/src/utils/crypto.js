import CryptoJS from "crypto-js";

export const encryptData = (data, secretKey) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (cipherText, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
