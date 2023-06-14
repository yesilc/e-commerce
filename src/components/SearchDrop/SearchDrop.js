
import React, { useEffect, useState } from 'react'
import './SearchDrop.css'
import { useNavigate } from 'react-router-dom'

export const SearchDrop = (bunch) => {

    // const[data, setData] = useState([{}]);
    // const[titleList, setTitleList] = useState([" "]);
    // const[filteredData, setFilterData] = useState([" "])

    const navigate = useNavigate();
    
    let titleList = bunch.data.map(({ title }) => title)
    let filteredData = titleList.filter((el) => {
        if (bunch.input === '') {
            return el
        }
        else {
            return el.toLowerCase().includes(bunch.input)
        }
    })

    const goToPage = (e)=>{
        const innerhtml = e.target.innerHTML
        let page = bunch.data.filter(obj => obj.title === innerhtml)
        navigate(`/product/${page[0]._id}`)
    }
    return (
        <div className='searchList'>
            {filteredData && filteredData.map((item, index) => (
                <div onClick={(e) =>goToPage(e)} className='items' key={index}>{item}</div>
            ))}
        </div>
    )
}
