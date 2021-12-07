import ClientJS from 'node_modules/clientjs/src/client.js'

const client = new ClientJS();

export const getFingerprint = () => {
    
    let fingerprint = client.getFingerprint();
    
    return fingerprint;
};