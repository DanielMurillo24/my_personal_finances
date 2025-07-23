import { configureStore } from "@reduxjs/toolkit";
import { authSlice, budgetSlice, categorySlice } from "./";


export const store = configureStore ({
    reducer: {
        category: categorySlice.reducer,
        budget: budgetSlice.reducer,
        auth: authSlice.reducer, 
    }
}) 