import { useDispatch, useSelector } from "react-redux"
import { loadingRecords, onGetRecords, onClearBudget, onUpdateRecord } from '../storage';
import financeApi from "../apis/financeApi";



export const useBudgetStore = () => {

    const dispatch = useDispatch();
    const {budget, errorMessage, isLoading} = useSelector ( state => state.budget);

    //------------------------------------------------------------------------------
    const getRecords = async () => {

        dispatch( loadingRecords() );
        try {
            const { data } = await financeApi.get('/budget');
            console.log('API response:', data);
            dispatch( onGetRecords({budget : data.budget}) );
            
        } catch (error) {
            
        }

    } 

    //------------------------------------------------------------------------------
    const createBudget = async (income) => {
        dispatch( loadingRecords() );

        try {
            const { data } = await financeApi.post('/budget', {
                income, 
                records: []
            });

            dispatch(onGetRecords({ budget: data.budget }));

        } catch (error) {
            console.error("Error creating budget:", error);
            //despachar error message al usuario 
        }

    }

    //------------------------------------------------------------------------------
    const deleteBudget = async (budgetId) => {
        dispatch(loadingRecords());

        try {
            await financeApi.delete(`/budget/${budgetId}`)
            dispatch(onClearBudget());
            
        } catch (error) {
            console.error("Error deleting budget:", error);
            //despachar error message al usuario 
        }
    }

    //------------------------------------------------------------------------------

    const addRecord  = async (description, amount) => {
        if (!budget?._id) return;
    
        try {
            const { data } = await financeApi.post(`/budget/${budget._id}/record`, {
                description,
                amount
            });
    
            dispatch(onGetRecords({ budget: data.budget }));
            
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };

    //------------------------------------------------------------------------------
    const updateRecord = async (budgetId, itemId, updatedRecord) => {
        dispatch(loadingRecords());

        try {
            const { data } = await financeApi.put(`/budget/${budgetId}/record/${itemId}`, updatedRecord);

            dispatch(onUpdateRecord(data.updatedBudget));
        } catch (error) {
            console.error("Error updating record:", error);            
        }
    }

    //------------------------------------------------------------------------------
    const deleteRecord = async (itemId) => {
        if (!budget?._id) return;

        dispatch(loadingRecords());

        try {
            const { data } = await financeApi.delete(`/budget/${budget._id}/record/${itemId}`);
            
            dispatch(onGetRecords({ budget: data.budget }));
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    }

    //------------------------------------------------------------------------------

    return{
        // Properties
        budget,
        records : budget ? budget.records : [],
        isLoading,

        // Methods
        getRecords,
        createBudget,
        deleteBudget,
        addRecord,
        updateRecord,
        deleteRecord
    }
}