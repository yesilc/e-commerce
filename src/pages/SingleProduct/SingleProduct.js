import React from 'react'
import {useParams} from "react-router-dom"; //url'deki parametreyi almamızı sağlıyor
import {products} from "../../utils/ProductsData"
import "./SingleProduct.css"
import ShoppingCartItemOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"
import { useDispatch } from 'react-redux';
import { addToBasket } from '../../redux/actions';

const SingleProduct = () => {
    let {id} = useParams();
    let singleProduct = products.find((item) => item.id === id);
    
    const dispatch = useDispatch();
    const addItemToTheBasket = () => {
        const item = {
            id: singleProduct.id,
            rating: singleProduct.rating,
            title: singleProduct.title,
            price: singleProduct.price,
            image: singleProduct.image,
            specification: singleProduct.specification,
            detail: singleProduct.detail
        };

        dispatch(addToBasket(item));
    }
    return (
    <div className='single-product-container'>
        <img 
            className='single-product-ad' 
            src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg' 
            alt=''>
        </img>
        <div className='single-product'>
            <img src={singleProduct.image} className='single-product-image' alt=''></img>
            <div className='single-product-info'>
                <div className='single-product-title'>{singleProduct.title}</div>
                <div className='single-product-rating'>
                    {Array(singleProduct.rating).fill().map((_,index) => (<p key={index}>⭐</p>))}
                </div>
                <p className='single-product-price'>
                    Price: <strong>$</strong>
                    <strong>{singleProduct.price}</strong>
                </p>
                <div className='single-product-specification'>
                    <h4>Specification</h4>
                    {singleProduct.specification && singleProduct.specification.map((item,index) => (
                        <li key={index}>{item}</li>
                    ))}
                </div>
                <div className='single-product-description'>
                    <h4>Product Description</h4>
                    <p>{singleProduct.detail}</p>
                </div>
                <button onClick={addItemToTheBasket}>
                    <i><ShoppingCartItemOutlinedIcon></ShoppingCartItemOutlinedIcon></i>
                    Add To Basket
                </button>
            </div>
        </div>
    </div>
  )
}

export default SingleProduct