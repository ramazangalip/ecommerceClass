//// alışveriş sepeti (cart) sayfası
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate();
  const url = window.location.href

  const increaseCart = (cartProduct) => {
    dispatch(ADD_TO_CART(cartProduct))
  }
  const decreaseCart = (cartProduct) => {
    dispatch(DECREASE_CART(cartProduct))
  }
  const removeFromCart = (cartProduct) => {
    dispatch(REMOVE_FROM_CART(cartProduct))
  }
  const clearCart = () => {
    dispatch(CLEAR_CART())
  }

  useEffect(()=>{
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
  },[dispatch,cartItems])

  useEffect(()=>{
    dispatch(SAVE_URL(url))
  },[dispatch,url])
  

  const checkout = () =>{
    if(isLoggedIn){
      navigate("/checkout-details")

    }else{
      navigate("/login")
    }
  }

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Alışveriş Sepeti</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Sepetiniz Şu anda boş.</p>
            <br />
            <div>
              <Link to="/#products">&larr;Alişverişe Devam Et </Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Ürün</th>
                  <th>Fiyat</th>
                  <th>Adet</th>
                  <th>Total</th>
                  <th>Yapılcak İşlem</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartProduct, index) => {
                  const { id, name, price, imageURL, cartQuantity } =
                    cartProduct;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button className="--btn" onClick={()=>decreaseCart(cartProduct)}>-</button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button className="--btn" onClick={()=>increaseCart(cartProduct)}>+</button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons} onClick={()=>removeFromCart(cartProduct)}>
                        <FaTrashAlt size={19} color="red" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className={"--btn --btn-danger"} onClick={clearCart}>Sepeti Temizle</button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Alişverişe Devam Et</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Toplam Ücret</h4>
                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>
                  <p>KDV Dahildir.</p>
                  <button className="--btn --btn-primary --btn-block" onClick={checkout}>
                    Ödeme Yap
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;