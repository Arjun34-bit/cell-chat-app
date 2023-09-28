export const encryptMessage = (encMsg) => {
  const secretKey = "julie2017mersal"; // Replace with your secret key

  // Encrypt data
  const encryptedData = CryptoJS.AES.encrypt(encMsg, secretKey).toString();

  return encryptedData;
};

export const decryptMessage = (decMsg) => {
  // To decrypt, use the same IV and secret key
  // Decrypt data
  const secretKey = "julie2017mersal";

  const decryptedBytes = CryptoJS.AES.decrypt(decMsg, secretKey);
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

  return decryptedData;
};
