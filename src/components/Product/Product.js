import React from 'react'
import "./Product.css"
import { Link } from "react-router-dom";
import ShoppingCartItemOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"
import {useDispatch} from "react-redux";
import { addToBasket } from '../../redux/actions';

const Product = ({ _id, title, image, price, rating, specification, detail }) => {
    const dispatch = useDispatch();
    const onAddItemToTheBasket = () => {
        const item = {
            _id,
            title,
            image,
            price,
            rating,
            specification,
            detail,
        };
        dispatch(addToBasket(item))
    }
    return (
        <div className="product">
            <div className="info">
                <Link to={`/product/${_id}`} className='title'>
                    <p>{title}</p>
                </Link>
                <p className='price'>
                    <strong>$</strong>
                    <strong>{price}</strong>
                </p>
                <div className='rating'>
                    {Array(rating).fill().map((_, index) => <p key={index}>⭐</p>)} {/*https://stackoverflow.com/questions/27637013/what-is-the-meaning-of-an-underscore-in-javascript-function-parameter*/}
                </div>
                </div>
                <img src={image} alt=""></img>
                <button onClick={onAddItemToTheBasket}>
                    <i>
                        <ShoppingCartItemOutlinedIcon></ShoppingCartItemOutlinedIcon>
                    </i>
                    Add To Basket
                </button>
          
        </div>
    )
}

export default Product