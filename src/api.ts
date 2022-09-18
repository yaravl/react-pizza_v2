import axios from "axios";
import { PizzaItem } from "./types/data";

const api = axios.create({
  baseURL: "https://62d7100851e6e8f06f183cd2.mockapi.io/items",
});

export const productsApi = {
  async getProduct(URL_PARAMS: string) {
    return await api.get<PizzaItem[]>(URL_PARAMS);
  },
};
