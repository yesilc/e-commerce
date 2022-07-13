import './App.css';
import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home/Home'
import Header from './components/Header/Header'
// import Register from './pages/Register/Register';
// import Login from './pages/Login/Login';
import { useDispatch } from "react-redux";
import { auth } from "./utils/firebase";
import { setuser } from './redux/actions';
// import SingleProduct from './pages/SingleProduct/SingleProdcut';
// import Checkout from './pages/Checkout/Checkout';
// import Payment from './pages/Payment/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loading from './components/Loading/Loading';
// import Orders from './pages/Orders/Orders';

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Payment = lazy(() => import("./pages/Payment/Payment"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const SingleProduct = lazy(() => import("./pages/SingleProduct/SingleProduct"));

const promise = loadStripe("pk_test_51LGMptLX8pgv5PhTRkhFJke2vKr89xDlnh45vZGE99T4q89eEEcwWKW2r9AvYb8R0Y0yMVl2pmb5TLmrorKYpG5G00kd14MHg6")

function App() {
  let dispatch = useDispatch(); //Bu işlemleri sayfayı yenilediğimizde kullanıcının hala giriş yapmış bir şekilde bulunmasını sağlamak için yaptık
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setuser(authUser))
      } else {
        dispatch(setuser(null));
      }
    })
  }, [dispatch])
  return (
    <div className='App'>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path='/' element={<><Header></Header><Home></Home></>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/product/:id' element={<><Header></Header><SingleProduct></SingleProduct></>}></Route>
          <Route path='/checkout' element={<><Header></Header><Checkout></Checkout></>}></Route>
          <Route path='/payment' element={<><Header></Header><Elements stripe={promise}><Payment></Payment></Elements></>}></Route>
          <Route path='/orders' element={<><Header></Header><Orders></Orders></>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
