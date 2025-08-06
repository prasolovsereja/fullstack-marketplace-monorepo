export interface User {
    id: number;
    email: string;
    role: 'SELLER' | 'BUYER' | 'ADMIN';
    createdAt: Date;
}