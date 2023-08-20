//// home sayfasındaki slider i yapacağımız yer
import React, { useEffect, useState } from 'react'
import "./Slider.scss"
import {AiOutlineArrowLeft,AiOutlineArrowRight} from "react-icons/ai"
import {sliderData} from "./slider-data"

const Slider = () => {

  const [currentSlide,setCurrentSlide] = useState(0)
  const slideLenght = sliderData.length 
  const autoScroll = true;
  let intervalTime = 5000;

  useEffect(()=>{
    setCurrentSlide(0)
  },[])
  useEffect(()=>{
    let slideInterval;
    if(autoScroll){
      slideInterval = setInterval(()=>{
        setCurrentSlide(currentSlide === slideLenght-1 ? 0 : currentSlide+1)
      },intervalTime)
    }
    return  () => clearInterval(slideInterval);
  },[autoScroll,intervalTime,currentSlide,slideLenght])

  const  nextSlide = () => {setCurrentSlide(currentSlide === slideLenght -1 ? 0 : currentSlide + 1)}
  const prevSlide = () =>  {setCurrentSlide(currentSlide === 0  ?  slideLenght -1 :  currentSlide -1)}

  return (
    <div className='slider'>
      <AiOutlineArrowLeft class="arrow prev" onClick={prevSlide}/>
      <AiOutlineArrowRight class="arrow next" onClick={nextSlide}/>


      {sliderData.map((slide,index) => {
        const {image,heading,desc} = slide
        return (
          <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
            {index === currentSlide && (
              <>
              <img src={image} alt='slider'/>
              <div className='content'>
                <h2>{heading}</h2>
                <p>{desc}</p>
                <hr/>
                <a href='#product' className='--btn --btn-primary'>Shop Now</a>
              </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Slider