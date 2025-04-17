import { configureStore } from "@reduxjs/toolkit";
import { authSlice, budgetSlice } from "./";


export const store = configureStore ({
    reducer: {
        budget: budgetSlice.reducer,
        auth: authSlice.reducer
    }
}) 