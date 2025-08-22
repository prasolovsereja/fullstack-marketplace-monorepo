export interface User {
    id: number;
    email: string;
    role: 'SELLER' | 'BUYER' | 'ADMIN';
    createdAt: Date;
}
export interface Category {
    id: number;
    name: string;
    isFeatured: boolean;
}
export interface DeliveryProfile {
    id: number;
    code: string;
    name: string;
}