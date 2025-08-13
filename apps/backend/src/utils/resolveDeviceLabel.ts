export const resolveDeviceLabel = (userAgent: string): 'userPc' | 'userPhone' | 'unknown' | 'guest' => {
    switch (userAgent) {
        case 'userPc': return 'userPc';
        case 'userPhone': return 'userPhone';
        case 'tablet': return 'unknown';
        default: return 'unknown';
    }
}