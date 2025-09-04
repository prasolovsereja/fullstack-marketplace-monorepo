import NavBar from "@/app/ui/NavBar";
import FavoriteCategories from "@/app/ui/FavoriteCategories";
import HeroSection from "@/app/ui/HeroSection";
import {getProducts} from "@/app/lib/data";
import ProductsGridClient from "@/app/ui/ProductsGridClient";


export default async function Page() {
    const products = await getProducts(12, 0);

  return (
      <div className='d-flex flex-column'>
        <NavBar />
        <FavoriteCategories />
        <HeroSection />
        <ProductsGridClient initialProducts={products} />
      </div>
  )
}