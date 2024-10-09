import React from 'react'
import HomePageCart from '../../components/HomePageCart'
import Navbar from '../../components/Navbar'

const Homepage = () => {
    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center bg-white shadow-lg rounded-bottom-circle  d-none d-sm-block" style={{height:"80vh"}}>
                <div className='container '>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12 align-content-lg-center  mt-5'>
                            <h1 className="display-5 fw-bold">Experience food<br /> Delivery like no other</h1>
                            <p className="lead mb-4">
                                We deliver the food of your choice wherever, whenever.
                                Select your food from only the top restaurants in the area, and get it in a flash.
                                Download the app now to discover more.
                            </p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button type="button" className="btn btn-custom btn-lg px-4 gap-3">Get Started</button>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center  mt-5'>
                            <img src='./images/Thali.png'></img>
                        </div>
                    </div>
                </div>
            </div>
            <HomePageCart/>
        </>
    )
}

export default Homepage