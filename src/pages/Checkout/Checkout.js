import React from 'react';
import './Checkout.css';
import { useSelector } from 'react-redux';
import CheckoutProduct from '../../components/CheckoutProduct/CheckoutProduct';
import SubTotal from '../../components/SubTotal/SubTotal';

const Checkout = () => {
    const { basket, user } = useSelector(state => state.data);
    return (
        <div className='checkout'>
            <div className='checkout-left'>
                <img className='checkout-ad'
                    src='http://www.bantag.com/Assets/images/Ecommerce-Web-Development-Banner.png'
                    alt=''>
                </img>
                <div>
                    <h3>Hello, {user?.email /*Eğer user varsa email adresi gözükecek */}</h3>
                    <h2 className='checkout-title'>
                        {basket.length === 0 ? "Your Shopping Basket is Empty " : "Your Shoppin Basket"}
                    </h2>
                    {basket && basket.map((item) => (
                        <CheckoutProduct key={item.id} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating}></CheckoutProduct>
                    ))}
                </div>
                <div className='checkout-right'>
                   <SubTotal></SubTotal>
                </div>
            </div>

        </div>
    )
}

export default Checkout