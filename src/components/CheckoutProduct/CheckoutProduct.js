import React from 'react'
import './CheckoutProduct.css'
import { useDispatch } from 'react-redux'
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"
import { removeFromBasket } from '../../redux/actions'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const CheckoutProduct = ({ id, title, image, rating, price, hideButton }) => {
    
    let dispatch = useDispatch();
     
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket(id));
    };
    return (
        <div className='checkout-product'>
            <img src={image} alt="" className='checkout-product-image'></img>
            <div className='checkout-product-info'>
                <p className='checkout-product-title'>{title}</p>
                <p className='checkout-product-price'>
                    <strong>$</strong>
                    <strong>{price}</strong>
                </p>
                <div className='checkout-product-rating'>
                    {Array(rating).fill().map((_,index)=>(
                        <p key={index}>⭐</p>
                    ))}
                </div>
                {!hideButton && (
                    <button onClick={removeItemFromBasket}>
                    <i>
                        <HighlightOffIcon></HighlightOffIcon>
                    </i>
                    Remove from Basket
                </button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct