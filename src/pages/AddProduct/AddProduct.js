
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AddProduct.css'
import Logo from '../../components/Header/logo-no-background.png';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { headerItemsOb } from '../../utils/ProductsData';

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [specification, setSpesification] = useState([" "]);
    const [detail, setDetail] = useState("");
    const [image, setImage] = useState("");
    const [type, setType] = useState("BOS");
    const [userEmail, setUser] = useState("omercan_yesil@hotmail.com");

    const{user} = useSelector((state) => state.data)

    const history = useNavigate();

    const handleSpecificationAdd = () => {
        setSpesification([...specification, " "])
    }
    const handleSpecificationRemove = (index) => {
        const list = [...specification]
        list.splice(index, 1);
        setSpesification(list)
    }
    const handleSpecificationChange = (e, index) => {
        const value = e.target.value
        const list = [...specification];
        list[index] = value;
        setSpesification(list)
    }
    const handleChange = (obj)=>{
        setType(obj.value);
    }
    const handleSubmit = async (e) => {

        setUser(user.email);
        const databody = {
            title,
            price,
            specification,
            detail,
            image,
            type,
            user:userEmail
        }
        console.log(JSON.stringify(databody))
        const res = await fetch("http://localhost:5000/addproduct", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(databody)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div className='register'>
            <Link to="/">
                <img src={Logo} className='register-logo' alt='logo'></img>
            </Link>
            <div className='register-container'>
                <h1>Add Your Product</h1>
                <form>
                    <h5>Title</h5>
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <h5>Category</h5>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        name="Category"
                        options={headerItemsOb}
                        onChange={handleChange}
                    />
                    <h5>Price</h5>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                    <h5>Specification</h5>
                    {
                        specification.map((spec, index) => (
                            <div key={index} className='specifications'>
                                <div className='first-division'>
                                    <input name='specification' type="text" id='specification'
                                        value={spec}
                                        onChange={(e) => handleSpecificationChange(e, index)}
                                    />
                                    {specification.length > 1 && (
                                        <button type='button' className='add-btn'
                                            onClick={() => handleSpecificationRemove(index)}
                                        >
                                            <span>Remove</span>
                                        </button>
                                    )}
                                </div>
                                <div className='second-division'>
                                    {specification.length - 1 === index && specification.length < 6 &&
                                        (
                                            <button type='button' className='remove-btn'
                                                onClick={(e) => handleSpecificationAdd(e)}
                                            >
                                                <span>Add</span>
                                            </button>
                                        )}
                                </div>
                            </div>
                        ))
                    }
                    <h5>Detail</h5>
                    <input type='text' onChange={(e) => setDetail(e.target.value)}></input>
                    <h5>Image URL</h5>
                    <input type='text' onChange={(e) => setImage(e.target.value)}></input>
                    <button type='button' onClick={(e) => handleSubmit(e)} id='cont' className='continue'>
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct