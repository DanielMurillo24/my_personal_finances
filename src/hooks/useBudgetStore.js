import { useDispatch, useSelector } from "react-redux"
import { loadingRecords, onGetRecords, onClearBudget, onUpdateRecord, onError, onclearError } from '../storage';
import financeApi from "../apis/financeApi";



export const useBudgetStore = () => {

    const dispatch = useDispatch();
    const {budget, errorMessage, isLoading} = useSelector ( state => state.budget);

    //------------------------------------------------------------------------------
    const getRecords = async () => {

        dispatch( loadingRecords() );
        try {
            const { data } = await financeApi.get('/budget');
            dispatch( onGetRecords({budget : data.budget}) );
            
        } catch (error) {
            const status = error.response?.status;
            const message = error.response?.data?.msg || error.message || 'Unexpected error';

            if (status === 404 && message === "No budget found for this user.") {
                dispatch(onClearBudget());
            } else {
              dispatch(onError(message));
              setTimeout(() => dispatch(onclearError()), 10);
            }
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
            dispatch(onError(
                error.response?.data?.msg || error.message || 'Error creating budget'
            ));
            setTimeout( () => {
                dispatch( onclearError() );
            }, 10 );
        }

    }

    //------------------------------------------------------------------------------
    const deleteBudget = async (budgetId) => {
        dispatch(loadingRecords());

        try {
            await financeApi.delete(`/budget/${budgetId}`)
            dispatch(onClearBudget());
            
        } catch (error) {
            dispatch(onError(
                error.response?.data?.msg || error.message || 'Error deleting budget'
            ));
            setTimeout( () => {
                dispatch( onclearError() );
            }, 10 );
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
            dispatch(onError(
                error.response?.data?.msg || error.message || 'Error adding record'
            ));
            setTimeout( () => {
                dispatch( onclearError() );
            }, 10 );
        }
    };

    //------------------------------------------------------------------------------
    const updateRecord = async (budgetId, itemId, updatedRecord) => {
        dispatch(loadingRecords());

        try {
            const { data } = await financeApi.put(`/budget/${budgetId}/record/${itemId}`, updatedRecord);

            dispatch(onUpdateRecord(data.updatedBudget));
        } catch (error) {
            dispatch(onError(
                error.response?.data?.msg || error.message || 'Error updating record'
            ));
            setTimeout( () => {
                dispatch( onclearError() );
            }, 10 );         
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
            dispatch(onError(
                error.response?.data?.msg || error.message || 'Error deleting record'
            ));
            setTimeout( () => {
                dispatch( onclearError() );
            }, 10 );
        }
    }

    //------------------------------------------------------------------------------

    return{
        // Properties
        budget,
        records : budget ? budget.records : [],
        isLoading,
        errorMessage,

        // Methods
        getRecords,
        createBudget,
        deleteBudget,
        addRecord,
        updateRecord,
        deleteRecord
    }
}