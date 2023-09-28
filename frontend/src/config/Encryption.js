export const encryptMessage = (encMsg) => {
  const crypto = require("crypto");

  // Your secret key (must be 16, 24, or 32 bytes long for AES-128, AES-192, or AES-256)
  const secretKey = "julie2017mersal"; // Change this to your key

  // Data to encrypt, including an emoji

  // Choose an initialization vector (IV) - must be 16 bytes
  const iv = crypto.randomBytes(16);

  // Create an AES cipher with the chosen key and IV
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    iv
  );

  // Encrypt the data
  let encryptedData = cipher.update(encMsg, "utf8", "base64");
  encryptedData += cipher.final("base64");

  return encryptedData;
};

export const decryptMessage = (decMsg) => {
  // To decrypt, use the same IV and secret key
  const secretKey = "julie2017mersal";
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    iv
  );

  // Decrypt the data
  let decryptedData = decipher.update(decMsg, "base64", "utf8");
  decryptedData += decipher.final("utf8");

  return decryptedData;
};
