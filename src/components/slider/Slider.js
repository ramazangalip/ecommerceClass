//// home sayfasındaki slider i yapacağımız yer
import React from 'react'
import "./Slider.scss"
import {AiOutlineArrowLeft,AiOutlineArrowRight} from "react-icons/ai"

const Slider = () => {
  return (
    <div className='slider'>
      <AiOutlineArrowLeft class="arrow prev"/>
      <AiOutlineArrowRight class="arrow next"/>

    </div>
  )
}

export default Slider