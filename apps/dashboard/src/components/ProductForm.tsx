import {useGetCategoriesQuery} from "../api/categoriesApi";
import {useCreateProductMutation} from "../api/productsApi";
import {useFormik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {productSchema} from "../utils/validation";
import {Product} from "../../../../packages/types/componentTypes";


const ProductForm = () => {
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
        validationSchema: {
            validate: (values) => {
                const parsed = productSchema.safeParse(values);

                if (parsed.success) return {};

                const errors = parsed.error.flatten().fieldErrors;

                // для отладки:
                console.error('Zod errors:', errors);

                return errors;
            }
        },
        onSubmit: (values, { setSubmitting }) => {
            console.log('submitting', values);
            const cleanedCategories = values.categories.map(({ id, name }) => ({ id, name }));
            console.log(typeof values.quantity);
            setSubmitting(true);
            createProduct({
                ...values, categories: cleanedCategories,
            });
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
        <form onSubmit={formik.handleSubmit}>

            <div className='mb-3'>
                <label htmlFor='title' className='form-label'>Название товара</label>
                <input className='form-control' name='title' value={formik.values.title} type='text' onChange={formik.handleChange} required />
                {formik.errors.title && <div>{formik.errors.title}</div>}
            </div>
            <div className='mb-3'>
                <label htmlFor='description' className='form-label'> Описание товара</label>
                <input className='form-control' name='description' value={formik.values.description} onChange={formik.handleChange} required />
                {formik.errors.description && <div>{formik.errors.description}</div>}
            </div>
            <div className='mb-3'>
                <label className='form-label'>Цена товара</label>
                <input  className='form-control' name='price' type="number" value={formik.values.price} onChange={formik.handleChange} required />
                {formik.errors.price && <div>{formik.errors.price}</div>}
            </div>
            <div className='mb-3'>
                <label className='form-label'></label>
                <input  className='form-control' name='quantity' type="number" value={formik.values.quantity} onChange={formik.handleChange} required />
                {formik.errors.quantity && <div>{formik.errors.quantity}</div>}
            </div>
            <div className='mb-3'>
                <label className='form-label'>Категории</label>
                <select
                    className='form-select'
                    multiple={true}
                    name='categories'
                    value={formik.values.categories.map((c) => c.id.toString())}
                    onChange={(e) => {
                        const selectedIds = Array.from(e.target.selectedOptions).map((o) => parseInt(o.value, 10));
                        const selectedObjects = categories.filter((cat) => selectedIds.includes(cat.id));

                        formik.setFieldValue('categories', selectedObjects);
                    }}>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
            </div>
            <button type='submit' className='btn btn-outline-primary' disabled={formik.isSubmitting}>Создать продукт</button>
        </form>

    )
};
export default ProductForm;