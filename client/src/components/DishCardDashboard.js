import { useState } from "react"

export default function DishCardDashboard () {

    const [dishName, setDishName] = useState('South Indian Thali')
    const [homemaker, setHomemaker] = useState('Arti Kitchen')
    const [price, setPrice] = useState(500)

    return(
        <>
            <div className="d-flex flex-column align-items-center position-relative shadow rounded-4 px-3 py-2 flex-shrink-0">
                <img src="./images/dashboardDish.png" alt="" className="mb-3" height={100}></img>
                <p className="dish-text mb-0">{dishName}</p>
                <p className="homemaker-text">{homemaker}</p>
                <p className="price-text">₹{price}</p>
                <button className="btn btn-custom text-nowrap">View more</button>
            </div>
        </>
    )
}