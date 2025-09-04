import axios from "axios";
import {Product} from "../../../../packages/types/componentTypes";
import * as process from "node:process";
const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const getProducts = async (limit: number, offset: number): Promise<Product[]> => {
    try {
       const response =  await axios.get<Product[]>(`${baseUrl}/products/buyer?limit=${limit}&offset=${offset}`);
       return response?.data.products;
    } catch (e) {
        console.error('Problem while fetching products', e);
        throw new Error('Problem while fetching products');
    }
}