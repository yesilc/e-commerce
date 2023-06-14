import React from 'react'
import { useEffect, useState } from 'react';
// import Product from "../../components/Product/Product"
import "./HeaderPage.css"
import { useParams } from 'react-router-dom';
import HProduct from '../../components/HProduct/HProduct';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);

  let { item } = useParams()
  console.log(item)
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((arr) => {
        if(item === "all"){
          setProducts(arr.data)
        }
        else{
          setProducts(arr.data.filter(product => product.type === item))
        }     
      })
  }, [])

  return (
    <div className='home-row'>
      {products.map(item => (
        <div>
          <HProduct
            key={item._id}
            _id={item._id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
            specification={item.specification}
            detail={item.detail}>
          </HProduct>
        </div>
      ))}
    </div>
  )
}

export default CategoryPage