export const getExpiresAt = (ttlInSeconds: number): Date => {
    return new Date(Date.now() +ttlInSeconds * 1000);
}