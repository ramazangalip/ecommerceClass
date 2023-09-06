//// bu sayfa cart sayfasından checkout a tıkladığımızda gelen, checkoutdetails componentidir. içinde adres inputları ve checkoutsummary yer alır.
import React, { useState } from 'react'
import styles from "./CheckoutDetails.module.scss"
import Card from '../../components/card/Card'
import { CountryDropdown } from 'react-country-region-selector'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/slice/checkoutSlice'
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary'

const initialState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: ""
}

const CheckoutDetails = () => {
  
  const [shippingAddress,setShippingAddress] = useState({...initialState})
  const [billingAddress,setBillingAddress] = useState({...initialState})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (event) => {
    const {name,value} = event.target
    setShippingAddress({...shippingAddress, [name]:value})
    
  }
  const handleBilling = (event) => {
    const {name,value} = event.target
    setBillingAddress({...billingAddress, [name]:value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(shippingAddress)
    // console.log(billingAddress)
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
    dispatch(SAVE_BILLING_ADDRESS(billingAddress))
    navigate("/checkout")
  }

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Teslimat Adresi</h3>
              <label>Kişi İsmi</label>
              <input type="text" placeholder="Recipient Name" required name="name" value={shippingAddress.name} onChange={(e)=> handleShipping(e)}></input>
              <label>1.adres</label>
              <input type="text" placeholder="Address Line 1" required name="line1" value={shippingAddress.line1} onChange={(e)=> handleShipping(e)}></input>
              <label>2.Adres</label>
              <input type="text" placeholder="Address Line 2" name="line2" value={shippingAddress.line2} onChange={(e)=> handleShipping(e)}></input>
              <label>Şehir</label>
              <input type="text" placeholder="City" required name="city" value={shippingAddress.city} onChange={(e)=> handleShipping(e)}></input>
              <label>İlçe</label>
              <input type="text" placeholder="State" required name="state" value={shippingAddress.state} onChange={(e)=> handleShipping(e)}></input>
              <label>Posta Kodu</label>
              <input type="text" placeholder="Postal Code" required name="postal_code" value={shippingAddress.postal_code} onChange={(e)=> handleShipping(e)}></input>
              <CountryDropdown className={styles.select} valueType="short" value={shippingAddress.country} onChange={(val)=> handleShipping({
                target: {
                  name: "country",
                  value: val
                }
              })}/>
              <label>Telefon</label>
              <input type="text" placeholder="Phone" required name="phone" value={shippingAddress.phone} onChange={(e)=> handleShipping(e)}></input>

            </Card>
            <Card cardClass={styles.card}>
              <h3>Fatura Adresi</h3>
              <label>Kişi İsmi</label>
              <input type="text" placeholder="Name" required name="name" value={billingAddress.name} onChange={(e)=> handleBilling(e)}></input>
              <label>1.Adres</label>
              <input type="text" placeholder="Address Line 1" required name="line1" value={billingAddress.line1} onChange={(e)=> handleBilling(e)}></input>
              <label>2.Adres</label>
              <input type="text" placeholder="Address Line 2" name="line2" value={billingAddress.line2} onChange={(e)=> handleBilling(e)}></input>
              <label>Şehir</label>
              <input type="text" placeholder="City" required name="city" value={billingAddress.city} onChange={(e)=> handleBilling(e)}></input>
              <label>İlçe</label>
              <input type="text" placeholder="State" required name="state" value={billingAddress.state} onChange={(e)=> handleBilling(e)}></input>
              <label>Posta Kodu</label>
              <input type="text" placeholder="Postal Code" required name="postal_code" value={billingAddress.postal_code} onChange={(e)=> handleBilling(e)}></input>
              <CountryDropdown className={styles.select} valueType="short" value={billingAddress.country} onChange={(val)=> handleBilling({
                target: {
                  name: "country",
                  value: val
                }
              })}/>
              <label>Telefon</label>
              <input type="text" placeholder="Phone" required name="phone" value={billingAddress.phone} onChange={(e)=> handleBilling(e)}></input>
              <button type="submit" className="--btn --btn-primary">Ödemeyi Onayla</button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary/>
            </Card>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CheckoutDetails