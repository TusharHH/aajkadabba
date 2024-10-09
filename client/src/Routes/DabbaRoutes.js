import React from 'react';
import  { Route,Routes } from 'react-router-dom'
import Homepage from '../Features/Homepage/Homepage';

function DabbaRoutes (){
    return (
        <>
            <Routes>
                <Route path='/' element={<Homepage/>}></Route>
            </Routes>
        </>
    )
}

export default DabbaRoutes;