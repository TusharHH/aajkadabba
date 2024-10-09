import { useState } from "react"
import ReactStars from 'react-rating-stars-component';

export default function LikedHomemakers() {
    const [homemaker, setHomemaker] = useState('Arti Kitchen')
    const [rating, setRating] = useState(5)
    const [reviewCount, setReviewCount] = useState(10)

    const ratingChanged = (newRating) => {
        setRating(newRating);
        console.log(newRating);
      };

    return (
        <>
            <div className="d-flex flex-column  position-relative shadow rounded-4 px-3 py-2 flex-shrink-0">
                <img src="./images/homemakerImg.jpg" alt="" className="mb-3" height={100}></img>
                <p className="mb-0">{homemaker}</p>
                <div className="d-flex align-items-end">
                    <ReactStars
                        count={5}
                        value={rating}
                        size={30}
                        isHalf={true}
                        edit={false}
                        activeColor="#ffd700"
                        classNames="mt-0"
                    />
                    <p>({reviewCount})</p>
                </div>
                <button className="btn btn-custom text-nowrap">View more</button>
            </div>
        </>
    )
}