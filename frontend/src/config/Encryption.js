import CryptoJS from "crypto-js";

export const encryptMessage = (encMsg) => {
  const secretKey = "julie2017mersal";

  const encryptedData = CryptoJS.AES.encrypt(encMsg, secretKey).toString();

  return encryptedData;
};

export const decryptMessage = (decMsg) => {
  const secretKey = "julie2017mersal";

  const decryptedBytes = CryptoJS.AES.decrypt(decMsg, secretKey);
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

  return decryptedData;
};
