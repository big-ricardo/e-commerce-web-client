import Product from "@/interfaces/product";
import * as actions from "./actionsTypes";

export interface GetProducts {
  categoryIds?: string[];
  productId?: string;
}

export const getProducts = ({ productId, categoryIds }: GetProducts) => ({
  type: actions.GET_PRODUCTS,
  payload: {
    productId,
    categoryIds,
  },
});

export const getProductsSuccess = (products: Product[]) => ({
  type: actions.GET_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

export const getProductsFailure = (error: any) => ({
  type: actions.GET_PRODUCTS_FAILURE,
  payload: {
    error,
  },
});
