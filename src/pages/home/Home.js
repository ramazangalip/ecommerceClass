//// slider ve product componentinin gösterildiği home sayfasıdır.
import React, { useEffect } from 'react'
import Slider from '../../components/slider/Slider'
import Product from '../../components/product/Product'

const Home = () => {
  const url = window.location.href

  useEffect(()=>{
    const scrollProducts = () => {
      if(url.includes("#product")){
        window.scrollTo({
          top:700,
          behavior:"smooth"
        })
        return;
      }
    }
    scrollProducts();
  },[url])
  return (
    <div>
      <Slider/>
      <Product/>
    </div>
  )
}

export default Home