import { createSlice} from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [], 
        isLoading: false,
        categoryErrorMessage: undefined,
    }, 
    reducers: {
        loadingCategories : (state) => {
            state.isLoading = true
        },
        onGetCategories : (state, { payload }) => {
            state.categories = payload;
            state.isLoading = false;
            state.categoryErrorMessage = undefined;
        },
        onAddCategory:(state, {payload}) =>{
            state.categories.push(payload);
            state.isLoading = false;
        },
        onUpdateCategory: (state, { payload }) =>{
            state.categories =  state.categories.map(cat => cat._id === payload._id ? payload: cat) 
        },
        onDeleteCategory:(state, {payload}) =>{
            state.categories = state.categories.filter(cat => cat._id !== payload);
        },
        onCategoryError:(state, { payload }) => {
            state.categoryErrorMessage = payload;
            state.isLoading = false;
        },
        onclearCategoryError: (state) => {
            state.categoryErrorMessage = undefined;
        }
    }
    
});

export const { loadingCategories, onGetCategories, onAddCategory, onUpdateCategory, onDeleteCategory, onCategoryError, onclearCategoryError,} = categorySlice.actions;