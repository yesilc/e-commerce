import React, { useState, useEffect } from 'react'
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import ShoppingCartItemOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { logOutInitiate } from '../../redux/actions';
import Logo from "./logo-no-background.png"
import { useNavigate } from 'react-router-dom';
import { SearchDrop } from '../SearchDrop/SearchDrop';

const Header = () => {

    const { user, basket } = useSelector((state) => state.data);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const[focus, setFocus] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/")
            .then((res) => res.json())
            .then((arr) => {
                setProducts(arr.data)
            })
    }, [])

    const handleAuth = () => {
        if (user) {
            dispatch(logOutInitiate());
        }
    }
    const addProductHandler = () => {
        if (user) {
            navigate("/addproduct")
        } else {
            navigate("/login")
        }
    }
    const yourProductHandler = () => {
        if (user) {
            navigate("/myproducts")
        } else {
            navigate("/login")
        }
    }
    const focusOut = () =>{
        setTimeout(() => {
            setFocus(false)
        }, 100);
    }
    return (
        <nav className='header'>
            <Link to="/">
                <img className='header-logo'
                    src={Logo}
                    alt='ecommerce'></img>
            </Link>
            <div className='header-option' style={{ marginRight: "-10px" }}>
                <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
            </div>
            <div className='header-option'>
                <span className='header-option1'>Select Your Address</span>
            </div>

            <div className='search' onFocus={() =>setFocus(true)} onBlur={focusOut}>
                <input onChange={(e) => setSearchInput(e.target.value)}  type="text" className='searchInput'></input>
                <SearchIcon className='searchIcon'></SearchIcon>
                {focus &&
                <SearchDrop className='searchDrop'
                    data={products}
                    input={searchInput}>
                </SearchDrop>
                }
            </div>

            <div className='header-nav'>
                <Link to={user ? "/" : "/login"} className="header-link">
                    <div onClick={handleAuth} className='header-option'>
                        <span className='header-option1'>Hello, {user ? user.email : "Guest"}{" "}</span>
                        <span className='header-option1'>{user ? "Sign Out" : "Sign In"}</span>
                    </div>
                </Link>
                <div onClick={addProductHandler} className="header-link" style={{ cursor: "pointer" }}>
                    <div className='header-option'>
                        <span className='header-option1'>Add</span>
                        <span className='header-option1'>your product</span>
                    </div>
                </div>
                <div onClick={yourProductHandler} className="header-link" style={{ cursor: "pointer" }}>
                    <div className='header-option'>
                        <span className='header-option1'>Your</span>
                        <span className='header-option1'>Products</span>
                    </div>
                </div>
                <Link to="/checkout" className="header-link">
                    <div className='header-basket'>
                        <ShoppingCartItemOutlinedIcon></ShoppingCartItemOutlinedIcon>
                        <span className='header-option2 basket-count'>{basket && basket.length}</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Header