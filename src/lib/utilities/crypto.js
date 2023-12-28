const { subtle } = window.crypto;

// symetric encryption of the data
const algorithmName = 'AES-GCM';
const algorithm = {
  name: algorithmName,
  length: 256
};
const extractable = true;
/** @type {KeyUsage[]} */
const keyUsages = ['encrypt', 'decrypt'];
/** @param {Uint8Array} iv */
export const aesGcmParams = (iv) => ({ name: algorithmName, iv });

export function createIv() {
  return window.crypto.getRandomValues(new Uint8Array(12));
}

export function createKey() {
  return subtle.generateKey(algorithm, extractable, keyUsages);
}

/** @param {CryptoKey} key */
export function exportKey(key) {
  return subtle.exportKey('jwk', key);
}

/** @param {JsonWebKey} key */
export function importKey(key) {
  return subtle.importKey('jwk', key, algorithm, extractable, keyUsages);
}

/**
 * @param {string} plaintext
 * @param {CryptoKey} key
 * @param {Uint8Array} iv
 */
export async function encrypt(plaintext, key, iv) {
  const plaintextArrayBuffer = new TextEncoder().encode(plaintext);
  const cipherArrayBuffer = await subtle.encrypt(aesGcmParams(iv), key, plaintextArrayBuffer);
  //convert from ArrayBuffer to base64 string
  const ciphertext = btoa(String.fromCharCode(...new Uint8Array(cipherArrayBuffer)));

  return ciphertext;
}

/**
 * @param {string} ciphertext
 * @param {CryptoKey} key
 * @param {Uint8Array} iv
 */
export async function decrypt(ciphertext, key, iv) {
  //convert from base64 string to ArrayBuffer
  const cipherArrayBuffer = Uint8Array.from(atob(ciphertext), (c) => c.charCodeAt(0));
  const decrypted = await subtle.decrypt(aesGcmParams(iv), key, cipherArrayBuffer);
  const decryptedMessage = new TextDecoder().decode(decrypted);

  return decryptedMessage;
}
