import ProductsGrid from "../../../../packages/ui/ProductsGrid";
import {useAppSelector} from "../slices/hooks";
import {useGetProductsQuery} from "../api/productsApi";
import ProductForm from "../components/ProductForm";

const MainPage = () => {
    const auth = useAppSelector((state) => state.auth);
    const {data: products = []} = useGetProductsQuery({limit: 10, offset: 0});

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
        <>
            <div className='container'>
                <ProductsGrid></ProductsGrid>
            </div>
            <div>
                <ProductForm />
            </div>
        </>
    )
}
export default MainPage;