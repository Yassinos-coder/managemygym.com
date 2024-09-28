import CryptoJS from 'crypto-js';

export function decrypt(encryptedData, iv, secretKey) {
    const key = CryptoJS.enc.Hex.parse(secretKey); // Ensure your key is formatted as hex
    const ivHex = CryptoJS.enc.Hex.parse(iv); // Convert IV from hex to WordArray

    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(encryptedData) }, // Convert encryptedData to WordArray
        key,
        {
            iv: ivHex,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    const utf8String = decrypted.toString(CryptoJS.enc.Utf8); // Convert to UTF-8

    if (!utf8String) {
        throw new Error('Decryption failed, invalid data or key.');
    }

    return utf8String;
}
