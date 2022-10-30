import * as actions from './actionsTypes';
import Category from '@/interfaces/category';

export const getCategories = () => ({
    type: actions.GET_CATEGORIES,
});

export const getCategoriesSuccess = (categories: Category[]) => ({
    type: actions.GET_CATEGORIES_SUCCESS,
    payload: {
        categories,
    },
});

export const getCategoriesFailure = (error: any) => ({
    type: actions.GET_CATEGORIES_FAILURE,
    payload: {
        error,
    },
});
