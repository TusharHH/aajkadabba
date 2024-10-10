import React, { useState } from 'react';
import HomePageCart from '../../components/HomePageCart';
import Navbar from '../../components/Navbar';

const Homepage = () => {
    return (
        <>
            <Navbar />

            <div className="d-flex justify-content-center align-items-center bg-white shadow rounded-bottom-circle rounded-sm" style={{ height: "80vh" }}>
                <div className='container'>
                    <div className='row flex-md-row flex-sm-column'>
                        <div className='col-lg-6 col-md-6 col-sm-12  align-content-lg-center order-md-2'>
                            <img src='./images/ThaliHero.png' style={{ height: "50vh", margin: "auto " }}></img>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 align-content-lg-center'>
                            <h1 className="display-5 fw-bold">Experience food<br /> <span style={{ color: "#FC8A06" }}>Delivery</span> like no other</h1>
                            <p className="lead mb-4">
                                We deliver the food of your choice wherever, whenever.
                                Select your food from only the top restaurants in the area, and get it in a flash.
                                Download the app now to discover more.
                            </p>
                            <div className="">
                                <button type="button" className="btn btn-custom btn-lg px-4 gap-3">Join Us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-5 mb-5'>
                <HomePageCart />
            </div>





            <div className="d-flex justify-content-center align-items-center vh-100" style={{
                backgroundImage: 'url(../images/bgTiffin1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: "no-repeat"
            }}>
                <div className='container mt-5 mb-5'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12'>

                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12' style={{ marginBottom: "100px" }}>
                            <h1 className="display-5 text-white fw-bold">Don’t miss out on your favourite food</h1>
                            <p className="lead mb-4 text-white">
                                Sign up now to enjoy your favourite food anywhere, anytime.
                                It is quick, easy and accessible to anyone of any age.
                                Free of charge, taste now is the solution to your every day foods.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mt-5 mb-5'>
                <div className='row'>
                    <div className='col'>
                        <h1 className="display-5 fw-bold">Dabba
                            <span style={{ color: "#DC4412" }}>delivery</span> on
                            <span style={{ display: 'block' }}>
                                your doorsteps.
                            </span>
                        </h1>
                        <p className="lead mb-4">
                            If your food takes more than 45 minutes, it’s on us.
                            <span style={{ display: 'block' }}>
                                We are proud to say we take delivery very seriously, so that you don’t have to worry about how or when the food gets to you.
                            </span>
                        </p>
                    </div>
                    <div className='col-auto ms-auto'> {/* Add ms-auto to push the image column to the right */}
                        <img src='./images/Taste.jpg' style={{ height: "50vh" }} alt="Taste" />
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
                            <h1 className="display-5 fw-bold">Work <span style={{ color: "#FC8A06" }}>whenever</span> you want, <span style={{ color: "#FC8A06" }}>wherever</span> you are</h1>
                            <p className="lead mb-4 ">
                                Work with us and accomodate your schedule as you like.
                                Our work rates have never been higher, this is because we give our empoyees several benefits that they enjoy throughout their journey.
                            </p>
                            <div className="">
                                <button type="button" className="btn btn-custom btn-lg px-4 gap-3">Join Us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}

            <div className="responsive-height">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-6 mt-3 kurale-regular text-white text-center text-lg-start">
                            AajKaDabba
                        </div>
                        <div className="col-12 col-lg-6 mt-3">
                            <div className="row">
                                <div className="col-4 text-white text-center">Privacy Policy</div>
                                <div className="col-4 text-white text-center">Blog</div>
                                <div className="col-4 text-white text-center">Help</div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-4 text-white text-center">Terms of Service</div>
                                <div className="col-4 text-white text-center">About Us</div>
                                <div className="col-4 text-white text-center">Contact Us</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Homepage