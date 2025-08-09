import Button from "../../../../packages/ui/Button";
import {FC} from "react";
import MainPage from "../pages/MainPage";

interface NavBarProps {
    openModal: () => void;
    logout: () => void;
}

const NavBar: FC<NavBarProps> = ({openModal, logout}) => {
    return (
        <nav className='navbar'>
            <Button type='button' className='btn btn-primary' onClick={openModal}>
                Создать товар
            </Button>
            <Button type='button' className='btn btn-outline-primary'>
                Мои заказы
            </Button>
            <Button type='button' className='btn btn-secondary' onClick={logout}>
                Выйти
            </Button>

        </nav>
    )
};
export default NavBar;