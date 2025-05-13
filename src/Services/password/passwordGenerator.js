import CryptoJS from 'crypto-js';

const secretKey = 'duzxcfghh'; // Ensure this is securely managed (e.g., via env variables).


// Function to hash the parameter and make it URL-safe
export const hashParam = (param) => {
    if(!param){
        return null;
    }
    const encrypted = CryptoJS.AES.encrypt(param.toString(), secretKey).toString();
    // Replace '+' with '-', '/' with '_', and remove '=' to make it URL-safe
    const urlSafeHash = encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return urlSafeHash;
};

// Function to decode the hashed parameter
export const decodeHash = (hashedParam) => {
    // Revert the URL-safe encoding back to standard Base64
    const base64Hash = hashedParam.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - hashedParam.length % 4) % 4);
    const bytes = CryptoJS.AES.decrypt(base64Hash, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
