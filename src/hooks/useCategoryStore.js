import { useDispatch, useSelector } from "react-redux"
import { loadingCategories, onGetCategories, onAddCategory, onUpdateCategory, onDeleteCategory, onCategoryError, onclearCategoryError } from '../storage';
import financeApi from "../apis/financeApi";



export const useCategoryStore = () => {

    const dispatch = useDispatch();
    const {categories, categoryErrorMessage, isLoading} = useSelector ( state => state.category);

    //------------------------------------------------------------------------------
    const getCategories = async () => {

        dispatch( loadingCategories() );
        try {
            const { data } = await financeApi.get('/category');
            dispatch( onGetCategories(data.categories));
            
        } catch (error) {
            dispatch(onCategoryError(
                error.response?.data?.msg || error.message || 'Unexpected error'
            ));
            setTimeout(() => dispatch(onclearCategoryError()), 10);
        }
    }

    //------------------------------------------------------------------------------
    const createCategory = async (categoryName) => {
        dispatch( loadingCategories());

        try {
            const { data } = await financeApi.post('/category', {categoryName});
            dispatch(onAddCategory( data.category));

        } catch (error) {
            dispatch(onCategoryError(
                error.response?.data?.msg || error.message || 'Error creating category'
            ));
            setTimeout( () => {
                dispatch( onclearCategoryError() );
            }, 10 );
        }
    }

    //------------------------------------------------------------------------------

    const updateCategory = async (categoryId, categoryName) => {
        dispatch(loadingCategories());

        try {
            const { data } = await financeApi.put(`/category/${categoryId}`, {categoryName});
            dispatch(onUpdateCategory(data.category));

        } catch (error) {
            dispatch(onCategoryError(
                error.response?.data?.msg || error.message || 'Error updating category'
            ));
            setTimeout( () => {
                dispatch( onclearCategoryError() );
            }, 10 );         
        }
    }

    //------------------------------------------------------------------------------
    const deleteCategory = async (categoryId) => {
        dispatch(loadingCategories());

        try {
            await financeApi.delete(`/category/${categoryId}`);
            dispatch(onDeleteCategory( categoryId ));
        } catch (error) {
            dispatch(onCategoryError(
                error.response?.data?.msg || error.message || 'Error deleting category'
            ));
            setTimeout( () => {
                dispatch( onclearCategoryError() );
            }, 10 );
        }
    }

    //------------------------------------------------------------------------------

    return{
        // Properties
        categories,
        isLoading,
        categoryErrorMessage,

        // Methods
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
}