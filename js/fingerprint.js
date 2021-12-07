import * as ClientJs from '/node_modules/clientjs/dist/client.base.min.js';

const client = new ClientJS();

export const getFingerprint = () => {
    
    let fingerprint = client.getFingerprint();
    
    return fingerprint;
};