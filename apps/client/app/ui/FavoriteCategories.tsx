import Link from "next/link";

const categories = [
    { name: 'Электроника и бытовая техника', href: '/' },
    { name: 'Одежда и обувь', href:  '/' },
    { name: 'Товары для дома', href: '/' },
]

const FavoriteCategories = () => {
    return (
        <ul className='d-flex flex-row py-3 border border-black' style={{listStyle: 'none'}}>
            {categories.map((category) => {
                return ( <li key={category.name} className='mx-5'>
                    <Link className='d-inline-item text-decoration-none' href={category.href} name={category.name}>{category.name}</Link>
                </li>)
            })
            }
        </ul>
    )
}
export default FavoriteCategories;