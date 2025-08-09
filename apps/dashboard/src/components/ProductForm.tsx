import {useGetCategoriesQuery} from "../api/categoriesApi";
import {useCreateProductMutation} from "../api/productsApi";
import {useFormik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {productSchema} from "../utils/validation";
import {Product} from "../../../../packages/types/componentTypes";
import {FC} from "react";

interface ProductFormProps {
    id: string;
    onClose: () => void;
}

const ProductForm: FC<ProductFormProps> = ({id, onClose}) => {
    const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
    const [createProduct] = useCreateProductMutation();
    const initialValues: Omit<Product, 'id' | 'sellerId'> = {
        title: '',
        description: '',
        quantity: 1,
        price: 0,
        categories: [],
    };
    const formik = useFormik({
        initialValues,
        validate: (values) => {
            const parsed = productSchema.safeParse(values);

            if (parsed.success) return {};

            const errors = parsed.error.flatten().fieldErrors;


            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            console.log('submitting', values);
            const cleanedCategories = values.categories.map(({ id, name }) => ({ id, name }));
            console.log(typeof values.quantity);
            setSubmitting(true);
            createProduct({
                ...values, categories: cleanedCategories,
            });
            onClose();
            setSubmitting(false);
        }
    })
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error...</div>;
    }
    return (
        <form id={id} onSubmit={formik.handleSubmit}>

            <div className='mb-3'>
                <label htmlFor='title' className='form-label'>Название товара</label>
                <input className='form-control' name='title' value={formik.values.title} type='text' onChange={formik.handleChange} />
                {formik.errors.title && <div className='my-2 text-danger'>{formik.errors.title}</div>}
            </div>
            <div className='mb-3'>
                <label htmlFor='description' className='form-label'> Описание товара</label>
                <input className='form-control' name='description' value={formik.values.description} onChange={formik.handleChange} />
                {formik.errors.description && <div className='my-2 text-danger'>{formik.errors.description}</div>}
            </div>
            <div className='mb-3'>
                <label htmlFor='price' className='form-label'>Цена товара</label>
                <input  className='form-control' name='price' type="number" value={formik.values.price} onChange={formik.handleChange} />
                {formik.errors.price && <div className='my-2 text-danger'>{formik.errors.price}</div>}
            </div>
            <div className='mb-3'>
                <label htmlFor='quantity' className='form-label'></label>
                <input  className='form-control' name='quantity' type="number" value={formik.values.quantity} onChange={formik.handleChange} />
                {formik.errors.quantity && <div className='my-2 text-danger'>{formik.errors.quantity}</div>}
            </div>
            <div className='mb-3'>
                <label htmlFor='categories' className='form-label'>Категории</label>
                <select
                    className='form-select'
                    multiple={true}
                    name='categories'
                    value={formik.values.categories.map((c) => c.id.toString())}
                    onChange={(e) => {
                        const selectedIds = Array.from(e.target.selectedOptions, opt => Number(opt.value));
                        formik.setFieldValue(
                            'categories',
                            categories.filter(cat => selectedIds.includes(cat.id))
                        );
                    }}>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
            </div>

        </form>

    )
};
export default ProductForm;