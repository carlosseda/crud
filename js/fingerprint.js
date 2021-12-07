const client = new ClientJS();

export const getFingerprint = () => {
    
    let fingerprint = client.getFingerprint();
    
    return fingerprint;
};