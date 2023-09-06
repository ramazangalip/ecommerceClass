//// kargolama ve fatura adres kaydı yönetiminin yapıldığı redux
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  shippingAdress : {},
  billingAddress:{}
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS(state,action){
      state.shippingAdress = action.payload
    },
    SAVE_BILLING_ADDRESS(state,action){
      state.billingAddress = action.payload
    },
  }
});

export const {SAVE_BILLING_ADDRESS,SAVE_SHIPPING_ADDRESS} = checkoutSlice.actions

export const selectShippingAdress = (state) => state.checkout.shippingAdress
export const selectBillingAdress = (state) => state.checkout.billingAddress


export default checkoutSlice.reducer