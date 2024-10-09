import React from 'react';
import  { Route,Routes } from 'react-router-dom'
import Homepage from '../Features/Homepage/Homepage';


function DabbaRoutes (){
    return (
        <>
            <Routes>
                <Route path='/' element={<div><Homepage/></div>}></Route>
            </Routes>
        </>
    )
}

export default DabbaRoutes;