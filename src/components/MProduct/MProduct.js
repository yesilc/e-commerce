import React from 'react'
import "./MProduct.css"
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useDispatch } from "react-redux";
import { addToBasket } from '../../redux/actions';

const MProduct = ({ _id, title, image, price, rating, specification, detail }) => {

    const handleDelete = () =>{
        fetch(`http://localhost:5000/delete/${_id}`,{
            method: 'DELETE'
        })
        .then(()=>console.log("Delete Successful"))
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
            <div>
                <Link to={`/editProduct/${_id}`}>
                    <button style={{ fontWeight: 'bold', fontSize: '1rem', width: '5rem', cursor: 'pointer'}}>
                        Edit
                        <i>
                            <EditIcon></EditIcon>
                        </i>
                    </button>
                </Link>

                <button className='btt' onClick={handleDelete} type='button' style={{ fontWeight: 'bold', fontSize: '1rem', width: '6rem', cursor: 'pointer'}}>
                    Delete
                    <i>
                        <HighlightOffIcon></HighlightOffIcon>
                    </i>
                </button>

            </div>
        </div>

    )
}

export default MProduct