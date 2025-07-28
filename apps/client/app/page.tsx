import NavBar from "@/app/ui/NavBar";
import FavoriteCategories from "@/app/ui/FavoriteCategories";
import HeroSection from "@/app/ui/HeroSection";
import ProductsGrid from "@/app/ui/PorductsGrid";
export default function Page() {
  return (
      <div className='d-flex flex-column'>
        <NavBar />
        <FavoriteCategories />
        <HeroSection />
        <ProductsGrid />
      </div>
  )
}