import { compare, hash } from 'bcrypt';
import { createCipheriv, createDecipheriv } from 'crypto';

export function hashIt(str: string) {
  return hash(str, +process.env.SALT_ROUNDS);
}

export function compareHash(str1: string, str2: string) {
  return compare(str1, str2);
}

export const encrypt = (str: string) => {
  const cipher = createCipheriv(
    'aes-256-cbc',
    process.env.ENC_KEY,
    process.env.IV,
  );
  let encrypted = cipher.update(str, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

export const decrypt = (encrypted: string) => {
  const decipher = createDecipheriv(
    'aes-256-cbc',
    process.env.ENC_KEY,
    process.env.IV,
  );
  const decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return decrypted + decipher.final('utf8');
};
