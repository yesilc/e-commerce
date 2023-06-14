import React, {useState, useEffect} from 'react';
import './Payment.css';
import { useSelector, useDispatch } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from '../../components/CheckoutProduct/CheckoutProduct';
import { getBasketTotal } from '../../utils/BasketTotal';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { db } from '../../utils/firebase';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "../../utils/axios";
import { setBasketEmpty } from '../../redux/actions';

//npm i @stripe/stripe-js @stripe/react-stripe-js || https://stripe.com/  ödeme işlemleri için api sağlıyor
//https://firebase.google.com/docs/cli  firebase.cmd'yi path'e ekle(C:\Users\pc\AppData\Roaming\npm)

const Payment = () => {
    const { basket, user } = useSelector(state => state.data);
    
    let dispatch = useDispatch();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState();

    useEffect(() => {
        const getClientSecret = async () =>{
            const response = await axios({
                method: "POST",
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
            });
            setClientSecret(response.data.clientSecret);
        };
    },[basket]);
   
    const stripe = useStripe();
    const element = useElements();
    let navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method : {
                 card: element.getElement(CardElement),
            },
        }).then(({paymentIntent}) =>{
            db.collection("users").doc(user && user.uid).collection("orders").doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            });
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch(setBasketEmpty());
            navigate("/orders", { replace: true });

        })
    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };
    return (
        <div className='payment'>
            <div className='payment-container'>
                <h1>Checkout {<Link to='/checkout'>{basket.length} items</Link>}</h1>
                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment-address'>
                        <p>{user && user.email}</p>
                        <p>House no.8, Kuzucubelen Street, Mezitli</p>
                        <p>Mersin, Turkey</p>
                    </div>
                </div>
                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className='payment-items'>
                        {basket && basket.map((item) => (
                            <CheckoutProduct key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating} />
                        ))}
                    </div>
                </div>
                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment-details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}></CardElement>
                            <div className='payment-priceContainer'>
                                <CurrencyFormat renderText={(value) => (
                                    <>
                                       <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment