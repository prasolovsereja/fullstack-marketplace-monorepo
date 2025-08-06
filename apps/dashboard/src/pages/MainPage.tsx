import ProductsGrid from "../../../../packages/ui/ProductsGrid";
import {useAppSelector} from "../slices/hooks";
import {useGetProductsQuery} from "../api/productsApi";

import api from "../api/axios";
import {buildUrl} from "../api/config";
import {useEffect} from "react";
const MainPage = () => {
    const auth = useAppSelector((state) => state.auth);
    const {data: products = []} = useGetProductsQuery({limit: 10, offset: 0});
    console.log('rtkquery products',products);
    // useEffect(() => {
    //     const getProducts = async () => {
    //         try{
    //             const products = await api.get(buildUrl("products"), {withCredentials: true});
    //             console.log('products', products);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //     getProducts()
    // }, [])
    return (
        <ProductsGrid></ProductsGrid>
    )
}
export default MainPage;