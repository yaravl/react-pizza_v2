import axios from "axios";
import type { IProductItem } from "./features/products/ProductItem";

const api = axios.create({
  baseURL: "https://62d7100851e6e8f06f183cd2.mockapi.io/",
});

export const productsApi = {
  getProduct(URL_PARAMS: string) {
    return api.get<IProductItem[]>("items" + URL_PARAMS);
  },
};
