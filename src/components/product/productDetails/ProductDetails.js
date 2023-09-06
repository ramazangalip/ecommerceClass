//// home sayfasındaki ürünlere tıkladığımızda çıkan product details componenti
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import styles from "./ProductDetails.module.scss";
import spinnerImg from "../../../assets/spinner.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const document = useFetchDocument("products", id);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cart = cartItems.find((cart) => cart.id === id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = () => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = () => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Ürün Detayları</h2>
        <div>
          <Link to="/#products">&larr; ürünlere dön</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b>
                  {product.id}
                </p>
                <p>
                  <b>Marka</b>
                  {product.brand}
                </p>
                <div className={styles.count}>
                  {cart === undefined ? null : (
                    <>
                      <button className="--btn" onClick={()=>decreaseCart(product)}>-</button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button className="--btn" onClick={()=>addToCart(product)}>+</button>
                    </>
                  )}
                </div>
                <button className="--btn --btn-danger" onClick={()=>addToCart(product)}>Sepete Ekle</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;