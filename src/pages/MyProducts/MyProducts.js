import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MProduct from "../../components/MProduct/MProduct"
import "./MyProducts.css"


const MyProducts = () => {
    const { user } = useSelector((state) => state.data);
    const [products, setProducts] = useState([]);

    let history = useNavigate();

    useEffect(()=>{
        if(!user){
            history("/");
        }
    },[]);
    useEffect(()=> {
        fetch("http://localhost:5000/")
        .then((res) => res.json())
        .then((arr) => {
          setProducts(arr.data.filter(item=> item.user === user.email))
        })
      },[])


    if(products.length === 0) return(<h1>You Do Not Have Any Products For Sale</h1>)
    else return ( 
        <div className='home-row'>
            {products.map(item => (
              <MProduct
                key={item._id}
                _id={item._id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                specification={item.specification}
                detail={item.detail}>
              </MProduct>
            ))}
          </div>
    )
}

export default MyProducts