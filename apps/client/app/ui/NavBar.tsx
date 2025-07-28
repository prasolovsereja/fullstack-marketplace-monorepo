import SearchBar from "@/app/ui/NavBar/SearchBar";
import NavLinks from "@/app/ui/NavBar/NavLinks";
import Button from "@/app/ui/NavBar/Button";

const NavBar = () => {
    return (
        <nav className='d-flex flex-row w-100 justify-content-evenly py-2 border border-black'>
            <Button type='button' className='btn btn-primary'>
                NEOZON
            </Button>
            <Button type='button' className='btn btn-outline-primary'>
                Каталог
            </Button>
            <SearchBar />
            <NavLinks />
        </nav>
    )
}
export default NavBar;