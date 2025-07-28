'use client';

import Link from 'next/link';
import {usePathname} from "next/navigation";

const links = [
    { name: 'Войти', href: '/login' },
    { name: 'Заказы', href: '/'},
    { name: 'Избранное', href: '/'},
    { name: 'Корзина', href:  '/' },
]

const NavLinks = () => {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link key={link.name} href={link.href}></Link>
                )
            })}
        </>
    )
}
export default NavLinks;
