import { ClientJS } from 'clientjs';

const client = new ClientJS();

export const getFingerprint = () => {
    
    let fingerprint = client.getFingerprint();
    
    return fingerprint;
};