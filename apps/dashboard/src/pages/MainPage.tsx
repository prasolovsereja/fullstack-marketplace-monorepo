import ProductsGrid from "../../../../packages/ui/ProductsGrid";
import {useAppDispatch, useAppSelector} from "../slices/hooks";
import {useGetProductsQuery} from "../api/productsApi";
import ProductForm from "../components/ProductForm";
import Modal from "../components/common/Modal";
import NavBar from "../components/NavBar";
import {useState} from "react";
import SellerCard from "../components/SellerCard";
import {Product} from "../../../../packages/types/componentTypes";
import {useLogout} from "../hooks/useLogout";
import {handleLogout} from "../utils/handleLogout";

const MainPage = () => {
    // const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const {data: products = [], isLoading, errors} = useGetProductsQuery({limit: 10, offset: 0});
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    }
    const renderCardContent = (product: Product) => {
        return <SellerCard productId={product.id} title={product.title} quantity={product.quantity} />
    };
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
    console.log('products', products);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (errors) {
        return <div>Error...</div>;
    }
    return (
        <>
            <NavBar openModal={handleOpenModal} logout={() => handleLogout(dispatch)} />
            <div className='container'>
                <ProductsGrid products={products.products} renderCardContent={renderCardContent}></ProductsGrid>
            </div>
            {isModalOpen &&
                <div>
                    <Modal title='Создать товар' formId='add-product-form' onClose={() => setModalOpen(false)} >
                        <ProductForm id='add-product-form' onClose={() => setModalOpen(false)} />
                    </Modal>
                </div>

            }
        </>
    )
}
export default MainPage;