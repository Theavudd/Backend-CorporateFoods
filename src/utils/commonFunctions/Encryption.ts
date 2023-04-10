import crypto from 'crypto';
import {Config} from '.';

function encrypt(text: any) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    Config.ENCRYPTION_ALGORITHM,
    Config.ENCRYPTION_KEY,
    iv,
  );
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return {iv: iv.toString('hex'), encryptedData: encrypted};
}

function decrypt(data: any) {
  let {iv, encryptedData} = data;
  iv = Buffer.from(iv, 'hex');
  encryptedData = Buffer.from(encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(
    Config.ENCRYPTION_ALGORITHM,
    Config.ENCRYPTION_KEY,
    iv,
  );
  let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

export default {
  Encrypt: encrypt,
  Decrypt: decrypt,
};
