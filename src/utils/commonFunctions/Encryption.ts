import crypto from 'crypto';
import {Config} from '.';

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(Config.ENCRYPTIONKEY),
    iv,
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};
}

// Decrypting text
export function decrypt(text: {iv: string; encryptedData: string}) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(Config.ENCRYPTIONKEY),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  console.log('decypher', decrypted);
  return decrypted.toString();
}
