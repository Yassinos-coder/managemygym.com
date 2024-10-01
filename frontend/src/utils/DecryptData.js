import CryptoJS from 'crypto-js';

export const DecryptData = (data) => {
    var bytes = CryptoJS.AES.decrypt(data.encryptedData, import.meta.env.VITE_ENCRYPTION_KEY);
    var decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
        throw new Error('Decryption failed: Invalid or empty encrypted data');
    }

    var decryptedData = JSON.parse(decryptedString);

    console.log(decryptedData)
    return decryptedData; // Parse the decrypted JSON

}