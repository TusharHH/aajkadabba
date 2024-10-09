import React from 'react';
import HomePageCart from '../../components/HomePageCart';
import Navbar from '../../components/Navbar';

const Homepage = () => {
    return (
        <>
            <Navbar />

            <div className="d-flex justify-content-center align-items-center bg-white shadow rounded-bottom-circle rounded-sm pt-5" style={{ height: "80vh" }}>
                <div className='container pt-5'>
                    <div className='row flex-md-row flex-sm-column'>
                        <div className='col-lg-6 col-md-6 col-sm-12 align-content-lg-center order-md-2'>
                            <img src='./images/ThaliHero.png' style={{ height: "50vh" }}></img>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 align-content-lg-center'>
                            <h1 className="display-5 fw-bold">Experience food<br /> Delivery like no other</h1>
                            <p className="lead mb-4">
                                We deliver the food of your choice wherever, whenever.
                                Select your food from only the top restaurants in the area, and get it in a flash.
                                Download the app now to discover more.
                            </p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button type="button" className="btn btn-custom btn-lg px-4 gap-3">Join Us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-5 mb-5'>
                <HomePageCart />
            </div>


            <div className='mt-5 mb-5'>
                <div className='' style={{ backgroundColor: "#FC8A06" }}>
                    <div className='container'>
                        <div className='row' style={{position: "relative"}}>
                            <div className='col-lg-6 col-md-6 col-sm-12 ' style={{position: "absolute",bottom:"10px" }}>
                                <img src='./images/tiffin.png' style={{ height: "500px" }}></img>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12'>
                                <div className="d-flex align-items-center h-100">
                                    <div>
                                        <h1 className="display-5 text-white fw-bold">Don’t miss out on your favourite food</h1>
                                        <p className="lead mb-4 text-white">
                                            Sign up now to enjoy your favourite food anywhere, anytime.
                                            It is quick, easy and accessible to anyone of any age.
                                            Free of charge, toate nest is the solution to your every day foods.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="d-flex justify-content-center align-items-center vh-100" style={{
                backgroundImage: 'url(../images/Delivery.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='mt-5 mb-5'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12'>

                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12'>
                            <h1 className="display-5 text-white fw-bold">Don’t miss out on your<br /> favourite food</h1>
                            <p className="lead mb-4 text-white">
                                Sign up now to enjoy your favourite food anywhere, anytime.
                                It is<br /> quick, easy and accessible to anyone of any age.
                                Free of charge,<br /> taste now is the solution to your every day foods.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center vh-100" style={{
                backgroundImage: 'url(../images/bgDelivery.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='mt-5 mb-5'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12'>

                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12'>
                            <h1 className="display-5 text-white fw-bold">Don’t miss out on your<br /> favourite food</h1>
                            <p className="lead mb-4 text-white">
                                Sign up now to enjoy your favourite food anywhere, anytime.
                                It is<br /> quick, easy and accessible to anyone of any age.
                                Free of charge,<br /> taste now is the solution to your every day foods.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage