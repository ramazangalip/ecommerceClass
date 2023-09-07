import React, { useEffect, useState } from 'react';
import styles from "./CheckoutSummary.module.scss";
import {  useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { Link } from 'react-router-dom';
import Card from '../card/Card';

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

 
  const [totalAmount, setTotalAmount] = useState(cartTotalAmount);

  useEffect(() => {
    
    setTotalAmount(cartTotalAmount);
  }, [cartTotalAmount]);

  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>Sepetiniz Şuanda Boş.</p>
            <button className='--btn'>
              <Link to="/#products">Mağazaya Geri Dön.</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Ürün Adedi: ${cartTotalQuantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>Toplam Fiyat:</h4>
              <h3>{totalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card key={id} cardClass={styles.card}>
                  <h4>Ürün: {name}</h4>
                  <p>Adet: {cartQuantity}</p>
                  <p>Adet fiyatı: {price}</p>
                  <p>Fiyat: {price * cartQuantity}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutSummary;
