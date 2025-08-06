export const BASE_URL = import.meta.env.VITE_API_URL;

export const apiRoutes = {
    me: '/auth/me',
    category: '/category',
    products: '/products',
}

export type ApiRouteKey = keyof typeof apiRoutes;
export type ApiRoutesPath = typeof apiRoutes[ApiRouteKey];

export const buildUrl = (route: ApiRouteKey): string => `${BASE_URL}${apiRoutes[route]}`;

