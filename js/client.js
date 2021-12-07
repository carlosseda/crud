import '../node_modules/clientjs/dist/client.min.js';

const client = new ClientJS();

export const getFingerprint = () => {
    
    let fingerprint = client.getFingerprint();
    
    return fingerprint;
};