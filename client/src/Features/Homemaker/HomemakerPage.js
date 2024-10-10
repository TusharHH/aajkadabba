import logo from '../../assets/Logo_Text.jpg';
import homemaker from '../../assets/HomemakerImage.jpg';
import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import ItemCards from '../../components/ItemCards';

export default function HomemakerPage() {

    const [homemakerImg, setHomemakerImg] = useState(homemaker);
    const [kitchen, setKitchen] = useState('Shardas Kitchen');

    const [rating, setRating] = useState(5);
    const [reviewCount, setReviewCount] = useState(10);

    const [isHeartFilled, setIsHeartFilled] = useState(false);  // state for heart button

    const toggleHeart = () => {
        setIsHeartFilled(!isHeartFilled);  // toggle heart state
    };

    return (
        <>
            <div className='d-flex flex-column gap-4 w-100'>
                <div className="p-3 justify-content-between d-flex">
                    <i className="bi bi-arrow-left" ></i>
                    <img src={logo} alt="" />
                </div>

                <div className='px-4 flex flex-column'>
                    <div className=''>
                        <img src={homemakerImg} height={200} alt="Homemaker" />
                    </div>
                    <div className='mt-4'>
                        <h6>{kitchen}</h6>
                        <div className="d-flex align-items-center justify-content-between">
                            {/* ReactStars and review count */}
                            <div className="d-flex align-content-center">
                                <div>
                                    <ReactStars
                                        count={5}
                                        value={rating}
                                        size={30}
                                        isHalf={true}
                                        edit={false}
                                        activeColor="#ffd700"
                                        classNames="mt-0"
                                    />
                                </div>
                                <p className='mt-2'>({reviewCount})</p>
                            </div>

                            {/* Heart Button */}
                            <div>
                                <i
                                    className={`bi ${isHeartFilled ? 'bi-heart-fill' : 'bi-heart'}`}
                                    style={{ color: isHeartFilled ? 'red' : 'black', fontSize: '24px', cursor: 'pointer' }}
                                    onClick={toggleHeart}
                                ></i>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <hr className='mx-3'></hr>

                <div className=''>
                    {/* add items cards */}
                    <ItemCards />
                </div>
            </div>
        </>
    );
}
