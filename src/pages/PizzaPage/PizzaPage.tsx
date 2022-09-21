import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductItem } from "../../features/products/ProductItem";
import { productsApi } from "../../api";
import type { IProductItem } from "../../features/products/ProductItem";

const PizzaPage = () => {
  const [props, setProps] = React.useState<IProductItem>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      getItem(id)
        .then((res) => setProps(res))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const getItem = async (id: string): Promise<IProductItem> => {
    try {
      const response = await productsApi.getSingleProduct(id);
      return response.data;
    } catch (e) {
      throw new Error("Pizza fetch failed!");
    }
  };

  return (
    <div className="pizza-single" style={{ textAlign: "center" }}>
      {props && (
        <>
          <img style={{ width: 300 }} src={props.imageUrl} alt={props.title} />
          <h4 style={{ fontSize: 30 }}>{props.title}</h4>
          <div style={{ marginBottom: 30 }}>
            {Array(Math.floor(props.rating / 2)).fill("⭐")}
          </div>
        </>
      )}
      <button className="button" onClick={() => navigate(-1)}>
        назад
      </button>
    </div>
  );
};

export default PizzaPage;
