import React from 'react'
import "./Home.css"
import { headerItems } from "../../utils/ProductsData" //{ headerItems, products }
import Banner1 from "../../BannerImages/Banner1.jpg"
import Banner2 from "../../BannerImages/Banner2.jpg"
import Banner3 from "../../BannerImages/Banner3.jpg"
import Banner4 from "../../BannerImages/Banner4.jpg"
import Banner5 from "../../BannerImages/Banner5.jpg"
import Banner6 from "../../BannerImages/Banner6.jpg"
import Slider from "../../components/Slider/Slider"
import Product  from "../../components/Product/Product"
import BackToTop from '../../components/BackToTop/BackToTop'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([]);

  const bannerImages = [Banner1, Banner2, Banner3, Banner4, Banner5, Banner6]
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((arr) => {
        setProducts(arr.data.map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value))
      })
  }, [])
  let navigate = useNavigate();
  const navCategory = (item) => {
    console.log(item)
    navigate(`/category/${item}`)
  }
  return (
    <div>
      <div className='item-container'>
        {headerItems && headerItems.map((item, index) => <p className='categories' key={index} onClick={() => navCategory(item.trim().toLocaleLowerCase())}>{item}</p>)}
      </div>
      <div className='home'>
        <div className='home-container'>
          <Slider images={bannerImages}></Slider>
          <div className='home-row'>
            {products.slice(0, 2).map(item => (
              <Product
                key={item._id}
                _id={item._id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                specification={item.specification}
                detail={item.detail}>
              </Product>
            ))}
          </div>
          <div className='home-row'>
            {products.slice(2, 5).map(item => (
              <Product
                key={item._id}
                id={item._id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                specification={item.specification}
                detail={item.detail}>
              </Product>
            ))}
          </div>
          <div className='home-row'>
            {products.slice(5, 6).map(item => (
              <Product 
                key={item._id}
                id={item._id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                specification={item.specification}
                detail={item.detail}>
              </Product>
            ))}
          </div>
          <div className='footer' style={{ marginTop: "40px" }}>
            <BackToTop></BackToTop>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
