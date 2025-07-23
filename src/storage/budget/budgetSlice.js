import { createSlice } from "@reduxjs/toolkit";


export const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        budget: null, 
        isLoading: false,
        errorMessage: undefined,
    }, 
    reducers: {
        loadingRecords : (state) => {
            state.isLoading = true
        },
        onGetRecords : (state, { payload }) => {
            state.isLoading = false;
            state.budget = payload.budget;
            state.errorMessage = undefined;
        },
        onClearBudget: (state) =>{
            state.budget = null;
            state.isLoading = false;
            state.errorMessage = undefined;
        },
        onUpdateRecord: (state, { payload }) =>{
            state.budget = payload;
            state.isLoading = false;
            state.errorMessage = undefined;
        },
        onUpdateIncome: (state, { payload }) =>{
            if (state.budget) {
                state.budget.income = payload.income;
            }
            state.isLoading = false;
            state.errorMessage = undefined;
        },
        onError:(state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        onclearError: (state) => {
            state.errorMessage = undefined;
        }
    }
    
});

export const { loadingRecords, onGetRecords, onClearBudget, onUpdateRecord, onUpdateIncome, onError, onclearError} = budgetSlice.actions;