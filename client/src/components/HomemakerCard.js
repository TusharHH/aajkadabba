import { useState } from "react"
import { Link } from "react-router-dom"
export default function HomemakerCard() {
    const [dishName, setDishName] = useState('Foodies')
    const [price, setPrice] = useState('600')
    
    return (
        <>
            <Link to={`/dashboard/${dishName}`}>
                <div className="d-flex flex-column ">
                    <img src="./images/placeholderTing.jpg" alt="" className="mb-3" height={100}></img>
                    <p className="dish-text mb-0">{dishName}</p>
                    <p className="price-text mb-0">₹{price}</p>
                </div>
            </Link>
        </>
    )
}