import axios from "axios";
import type { IProductItem } from "./features/products/ProductItem";
import type { ICartState } from "./features/cart/cartSlice";

const api = axios.create({
  baseURL: "https://62d7100851e6e8f06f183cd2.mockapi.io/",
});

export const productsApi = {
  getProducts(URL_PARAMS: string) {
    return api.get<IProductItem[]>("items" + URL_PARAMS);
  },
  getSingleProduct(id: string) {
    return api.get<IProductItem>("items/" + id);
  },
};

export const localStorageApi = {
  getFromLS(key: string) {
    const res = localStorage.getItem(key);
    if (res) {
      return JSON.parse(res);
    }
    return { items: [], totalCount: 0, totalPrice: 0 } as ICartState;
  },
  setToLS(key: string, state: ICartState) {
    const arrString = JSON.stringify(state);
    localStorage.setItem(key, arrString);
  },
  clearLS(key: string) {
    localStorage.removeItem(key);
  },
};
